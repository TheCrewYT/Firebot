
const _ = require('underscore')._;

// This is an 'enum' of all available effect types.
var EffectType = {
  API_BUTTON: "API Button",
  CHANGE_GROUP: "Change Group",
  CHANGE_SCENE: "Change Scene",
  CHAT: "Chat",
  COOLDOWN: "Cooldown",
  CELEBRATION: "Celebration",
  DICE: "Dice",
  GAME_CONTROL: "Game Control",
  HTML: "HTML",
  PLAY_SOUND: "Play Sound",
  SHOW_IMAGE: "Show Image",
  CUSTOM_SCRIPT: "Custom Script",
  DELAY: "Delay"
}

// Generate the template file path based off of the effect type
var getTemplateFilePathForEffectType = function(effectType) {
  var normalizedEffectType = ""
  if(effectType != null) {
    normalizedEffectType = effectType.toLowerCase().replace(' ', '-');
  } else {
    normalizedEffectType = "no-effect-type-provided"
  }
  return './templates/interactive/effect-options/' + normalizedEffectType + '.html';
}

// Returns a controller to be used for the template of a given effectype
var getTemplateControllerForEffectType = function(effectType) {
  var controller = ($scope) => {};
  
  switch(effectType) {
    case EffectType.PLAY_SOUND:
      controller = ($scope, listenerService) => {
        
        var uuid = _.uniqueId();
        
        $scope.openFileExporer = function() {
          var registerRequest = {
            type: listenerService.ListenerType.SOUND_FILE,
            uuid: uuid,
            runOnce: true,
            publishEvent: true
          }
          listenerService.registerListener(registerRequest, (filepath) => {
            $scope.effect.file = filepath;
            $scope.$applyAsync();
          });
        };    
      };
      break;
    case EffectType.SHOW_IMAGE:
      controller = ($scope, listenerService) => {
        
        $scope.imagePositions = [
          "Top Left",
          "Top Middle",
          "Top Right",
          "Middle Left",
          "Middle",
          "Middle Right",
          "Bottom Left",
          "Bottom Middle",
          "Bottom Right"
        ];
        
        var uuid = _.uniqueId(); 
        
        $scope.openFileExporer = function() {
          var registerRequest = {
            type: listenerService.ListenerType.IMAGE_FILE,
            uuid: uuid,
            runOnce: true,
            publishEvent: true
          }
          listenerService.registerListener(registerRequest, (filepath) => {
            $scope.effect.file = filepath;
            $scope.$applyAsync();
          });
        };         
      };
      break;
  }
  
  return controller;
}

exports.EffectType = EffectType;
exports.getTemplateFilePathForEffectType = getTemplateFilePathForEffectType;
exports.getTemplateControllerForEffectType = getTemplateControllerForEffectType;