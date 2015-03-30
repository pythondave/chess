angular.module('dcc.dummyServer', ['ngMockE2E'])
.run(function($httpBackend, positionsServerService) {

  $httpBackend.whenGET(/.html/).passThrough();

  $httpBackend.whenGET(/batch\?.*/).respond({ x: 'an idea for the future - to batch multiple requests' });

  $httpBackend.whenGET(/position\?.*/).respond(positionsServerService.positionResponse);
  $httpBackend.whenGET(/position-for-user\?.*/).respond(positionsServerService.positionForUserResponse);
});