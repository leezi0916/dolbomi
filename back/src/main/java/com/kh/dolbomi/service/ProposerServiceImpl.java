package com.kh.dolbomi.service;


import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.repository.ProposerRepositoryV2;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProposerServiceImpl implements ProposerService {

    private final ProposerRepositoryV2 proposerRepositoryV2;

    @Override
    public ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo) {
        List<Proposer> proposers = proposerRepositoryV2.findByHiring_HiringNo(hiringNo);

        List<ProposerDto.Response> dtoList = proposers.stream()
                .map(ProposerDto.Response::toDto)
                .toList();

        return ProposerDto.ResponseWithCount.builder()
                .count(dtoList.size())
                .proposers(dtoList)
                .build();
    }
}
