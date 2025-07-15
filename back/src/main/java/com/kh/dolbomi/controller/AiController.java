package com.kh.dolbomi.controller;

import com.kh.dolbomi.dto.PatientDto;
import com.kh.dolbomi.dto.PatientDto.AiResponse;
import com.kh.dolbomi.dto.PatientDto.Response;
import com.kh.dolbomi.service.PatientService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class AiController {


    private final PatientService patientService;
    private final ChatModel chatModel;

    @PostMapping()
    public AiResponse testChatModel(@RequestParam("pat_no") Long patNo) {

        PatientDto.AiResponse response = new AiResponse();
        try {
            Response patient = patientService.getPatient(patNo);
            response.setPat_name(patient.getPat_name());
            if (patient == null) {
                response.setResponse("환자가 입력한 질병태그가 없습니다.");
                response.setError("성공");
                return response;
            }
            PromptTemplate promptTemplate = new PromptTemplate(
                    "당신은 노인 전문의로, 40년 이상의 임상 경력을 가진 베테랑 의사입니다.\n\n"
                            + "아래 환자 정보를 참고하여 해당 환자의 질병에 대한 이해를 돕고,\n"
                            + "실생활에서 실천 가능한 예방법을 전문가의 시각에서 작성해주세요.\n\n"
                            + "- 환자 키: {patHeight}cm\n"
                            + "- 환자 몸무게: {patWeight}kg\n"
                            + "- 환자 질병 목록: {diseaseTags}\n\n"
                            + "작성 조건:\n"
                            + "1. 답변은 '1.', '2.', '3.' 과 같이 숫자와 마침표를 붙여 번호 매겨진 항목 형태로 작성해주세요.\n"
                            + "2. 각 문단은 간결하게 3~4줄 이내로 정리해주세요.\n"
                            + "3. 문장 사이에 공백 줄을 활용해 가독성을 높이세요.\n"
                            + "4. 글자 수는 총 500자 이내로 제한합니다.\n"
                            + "5. 너무 의학적이지 않고 보호자나 간병인이 이해하기 쉬운 따뜻한 어조로 작성해주세요.\n\n"
                            + "아래와 같은 형식으로 작성해주세요:\n"
                            + "【질병 정보】\n"
                            + "1. ...\n"
                            + "2. ...\n\n"
                            + "【예방 방법】\n"
                            + "1. ...\n"
                            + "2. ...\n"
            );
            Prompt prompt = promptTemplate.create(
                    Map.of(
                            "patHeight", patient.getPat_height(),
                            "patWeight", patient.getPat_weight(),
                            "diseaseTags", patient.getDisease_tags()
                    )
            );

            ChatClient chatClient = ChatClient.builder(chatModel).build();
            String result = chatClient.prompt(prompt).call().content();

            response.setResponse(result);
            response.setError("성공");

        } catch (Exception e) {
            response.setError(e.getMessage());
        }
        return response;
    }

}
