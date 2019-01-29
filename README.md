# Boom Message

## 빌드를 위한 사전 환경
```
npm(or yarn)
node(v8.12.0 - test complete)
```

## 내용
- 메세지를 보여줄때는 메세지 내용 + 남은 시간(초)를 보여준다.
- 메세지들은 남은 시간 내림 차순으로 보여준다.
- 메세지들의 남은 시간이 실시간으로 업데이트 된다.
- 메세지의 남은 시간이 0이면 해당 메세지는 삭제 되어야 한다.
- 메세지 작성시 문구는 최소 3자 이상이여야 한다.
- 메세지 작성시 메세지 시간은 3초, 5초, 10초, 30초, 1분을 선택할
수 있다.
- 메세지는 개별로 삭제 가능하며, 남은 시간이 수정(추가/감소)가능하
다.
  - 메세지 시간 추가는 +3초, +5초, 2배, 3배 가능하다. 
  - 메세지 시간 감소는 -3초, -5초 가능하다.
- **Unit test code를 작성.**
- **E2E test code를 작성.**


## 폴더 구조
```
build/
 - webpack을 이용하여 코드를 번들링한 파일이 저장되어있다.
 - 모든 환경에서 index.html 파일을 열면 브라우저를 통하여 코드를 실행해 볼 수 있다.

e2e/
 - cypress를 활용한 e2e 테스트코드가 저장되어 있다.

src/
 - 기능 구현을 한 코드들이 저장되어있다.
 - 구현 코드를 확인하고 싶다면 여기서 확인 할 수 있다.
 
src/__tests__
 - jest를 활용한 unit test 코드가 저장되어 있다.
```

## Script 활용
- `npm`을 사용할 수 있는 환경이어야 한다.

```
코드 확인
npm install && npm run build

Unit test 커버리지 확인
npm install && npm run test:coverage

E2E 시뮬레이션 
npm install && npm run test:e2e

E2E 시뮬레이션 using cypress simulator
npm install && npm run test:e2e:open

run for dev environment
npm install && npm run start // 4000포트 접속 가능
```
