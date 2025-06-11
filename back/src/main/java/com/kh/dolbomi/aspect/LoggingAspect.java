package com.kh.dolbomi.aspect;

/*
    스프링 어플리케이션은 대부분의 경우에서 MVC패턴에 따라서 Web Layer -> Business Layer -> Data Layer
    Web Layer : RestAPI를 제공하고, Client 중심의 로직 적용
    Business Layer : 내부의 정책에 따른 로직을 개발 -> 서비스의 핵심을로 주로 비즈니스마다 달라지는 코드(개발자가 집중해야하는 부분)
    Data Layer : 데이터베이스 및 외부와의 연동

    AOP를 통해서 이러한 각 레이어에서 반복되는 공통 관심사항을 분리함으로써 코드의 재사용성을 높이고
    유지보수성을 강화할 수 있다.
    ex) 로깅, 트랜잭션관리, 보안...

    - spring의 AOP를 활용하여 로깅작성

    장점
    - 특정 메서드만 선택적으로 로깅이 가능
    - 재사용성이 높다

    단점
    - AOP설정을 추가해줘야하기때문에 조금 복잡하다.
 */
/*
        <시점>
        @Before : 대상메서드 실행 전에 Advice(추가기능)가 실행된다

        @After : 대상메서드 실행 후에 Advice(추가기능)이 실행된다.

        @AfterReturning : 대상 메서드가 정상적으로 반환된 후에 Advice(추가기능)

        @AfterThrowing : 대상 메서드가 비정상적으로 반환(예외를 반환)된 후에 Advice(추가기능)

        @Around : 대상메서드를 감싸서 메서드 호출 전후에 Advice(추가기능) 실행

        @Pointcut
        - Advice를 적용할 JoinPoint들을 정의하는데 사용된다.
        - 해당 aop를 실행할 특정 메서드나 클래스를 지정
 */

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    //com.kh.boot.RESTController패키지의 하위 클래스의 모든 메서드에서 전부 적용하겠다.

    @Pointcut("execution(* com.kh.dolbomi.controller.*.*(..) )")
    private void controllerPointcut() {};

    @Before("controllerPointcut()")
    public void before(JoinPoint joinPoint) {
        //실행되는 메서드의 이름을 가져오기

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        Object[] args = joinPoint.getArgs(); //파라미터 가져오기
        log.info("============================== START =======================================");
        log.info("-------------------------- API Controller -------------------------------------");
        log.info("info          : {}", methodSignature);
        log.info("method name   : {}", method);
        log.info("parameter     : {}", Arrays.toString(args));
    }

    @AfterReturning(value = "controllerPointcut()", returning = "obj")
    public void afterReturning(JoinPoint joinPoint, Object obj) {
        log.info("============================== END =======================================");
        log.info("object          : {}", obj);
    }

    @AfterThrowing(pointcut = "controllerPointcut()", throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Throwable e) {
        log.info("error in request  : {}", joinPoint.getSignature());
        log.info("error msg  : {}", e.getMessage());
    }

    @Around("controllerPointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        //실행해야하는 로직
        Object result = joinPoint.proceed(); //원래 하려고 했던 작업 실행

        long endTime = System.currentTimeMillis();

        long runTime = endTime - startTime;
        log.info("----------------------------------------------------------------------");
        log.info("info           : {}", joinPoint.getSignature());
        log.info("execution time : {} ms", runTime);

        return result;
    }

}