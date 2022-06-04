# SALEND API
SALEND API SERVER

## 사용법
1. `npm install` 의존성 패키지들을 설치합니다
2. `node bin/www` 서버를 실행합니다.
---

## 개발 보조 문서 실행
1. `npm install apidoc` apidoc 패키지를 설치합니다.
2. `npm run doc` apidoc을 통해 문서를 생성합니다.
3. `serve APIDOC` `http://localhost:3000`에 접속하여 문서를 확인할 수 있습니다.


### 에러 관련

#### 에러 400
```JSON
    {"success": false, "msg": "메시지"}
    에러에 대한 정보가 msg 위치에 출력됩니다.
```

#### 에러 409
```JSON
    {"success": false, "msg": "hasn't parameter"}
    필요로 하는 파라미터가 없을 경우 반환되는 에러입니다.
```

#### 에러 404, 502
```
    서버가 꺼져있거나 Method(GET, POST, PUT) 등이 일치하지 않을 경우 발생합니다.
    서버 처리 과정 중에서 에러가 발생한 경우에도 발생할 수 있습니다.
```
