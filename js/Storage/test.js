

define(function(require){
  // 싱글톤을 생성해주는 모듈 객체.
  // 익명 함수 실행 결과를 받습니다.
  var test = (function(){

      // 실제 싱글톤 적용 객체
      function Singleton(args) {

          // 내부 작업...
          var args = args || {};
          this.a = args.a;
          this.b = args.b;
      }

      // 인스턴스 객체.
      // 다수의 객체 생성을 제한하는 역할입니다
      var INSTANCE;

      // 외부에 공개될 객체를 반환합니다.
      // 모듈 패턴(Module Pattern)이라고 부릅니다
      return {
          getInstance: function ( args ){
              if (INSTANCE === undefined) {
                  INSTANCE = new Singleton( args );
              }
              return INSTANCE;
          }
      };

  })();

    return test;
});
