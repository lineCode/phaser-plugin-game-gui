// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  var Arcade, PROPS, Phaser, ScaleManager, addArcadeSortDirection, addScaleMode, dat, isArray, saveNumericValue, scaleModes,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  dat = this.dat, Phaser = this.Phaser;

  ScaleManager = Phaser.ScaleManager;

  Arcade = Phaser.Physics.Arcade;

  isArray = Array.isArray;

  if (ScaleManager) {
    scaleModes = {
      "exact fit": ScaleManager.EXACT_FIT,
      "no scale": ScaleManager.NO_SCALE,
      "resize": ScaleManager.RESIZE,
      "show all": ScaleManager.SHOW_ALL,
      "user scale": ScaleManager.USER_SCALE
    };
  }

  addArcadeSortDirection = function(cn, arcade, name) {
    var controller;
    controller = cn.add(arcade, name, {
      "bottom top": Arcade.BOTTOM_TOP,
      "left right": Arcade.LEFT_RIGHT,
      "right left": Arcade.RIGHT_LEFT,
      "top bottom": Arcade.TOP_BOTTOM,
      "sort none": Arcade.SORT_NONE
    });
    controller.onChange(saveNumericValue);
    return controller;
  };

  addScaleMode = function(cn, scaleManager, name) {
    var controller;
    controller = cn.add(scaleManager, name, scaleModes);
    controller.onChange(saveNumericValue);
    return controller;
  };

  saveNumericValue = function(newValue) {
    this.object[this.property] = Number(newValue);
  };

  PROPS = Object.freeze({
    game: {
      clearBeforeRender: true,
      forceSingleUpdate: true,
      lockRender: true,
      paused: true,
      step: true,
      stepping: true,
      camera: {
        fade: true,
        flash: true,
        reset: true,
        resetFX: true,
        roundPx: true,
        shake: true,
        unfollow: true,
        x: function(cn, camera) {
          return [camera.bounds.left, camera.bounds.right - camera.view.width, 10];
        },
        y: function(cn, camera) {
          return [camera.bounds.top, camera.bounds.bottom - camera.view.height, 10];
        },
        lerp: {
          x: [0, 1, 0.05],
          y: [0, 1, 0.05]
        }
      },
      debug: {
        sprite: {
          visible: true
        }
      },
      input: {
        enabled: true,
        maxPointers: [-1, 10, 1],
        keyboard: {
          enabled: true
        },
        mouse: {
          enabled: true
        },
        touch: {
          enabled: true
        }
      },
      physics: {
        arcade: {
          checkCollision: {
            down: true,
            left: true,
            right: true,
            up: true
          },
          forceX: true,
          gravity: {
            x: [-1000, 1000, 10],
            y: [-1000, 1000, 10]
          },
          isPaused: true,
          OVERLAP_BIAS: [-16, 16, 1],
          skipQuadTree: true,
          sortDirection: addArcadeSortDirection
        }
      },
      scale: {
        fullScreenScaleMode: addScaleMode,
        parentIsWindow: true,
        refresh: true,
        scaleMode: addScaleMode,
        startFullScreen: true,
        stopFullScreen: true
      },
      sound: {
        mute: true,
        volume: [0, 1, 0.1]
      },
      stage: {
        backgroundColor: function(cn, stage, name) {
          return cn.addColor(stage, name);
        },
        disableVisibilityChange: true,
        smoothed: true
      },
      state: {
        restart: true
      },
      time: {
        desiredFps: [10, 120, 5],
        slowMotion: [0.1, 10, 0.1]
      },
      tweens: {
        frameBased: true,
        pauseAll: true,
        resumeAll: true
      },
      world: {
        alpha: [0, 1, 0.1],
        visible: true
      }
    }
  });

  Phaser.Plugin.GameGui = (function(superClass) {
    extend(GameGui, superClass);

    function GameGui() {
      return GameGui.__super__.constructor.apply(this, arguments);
    }

    GameGui.prototype.gui = null;

    GameGui.prototype.init = function(options) {
      this.createGui(options);
    };

    GameGui.prototype.destroy = function() {
      this.gui.destroy();
    };

    GameGui.prototype.add = function(guiContainer, obj, props) {
      var args, name;
      for (name in props) {
        args = props[name];
        this.addProp(guiContainer, obj, name, args);
      }
      return guiContainer;
    };

    GameGui.prototype.addProp = function(guiContainer, obj, name, args) {
      var addArgs, field, result, val;
      val = obj[name];
      if (val == null) {
        console.warn("Skipped '" + name + "' (" + val + ")");
        return;
      }
      if (typeof args === "function") {
        result = args.call(null, guiContainer, obj, name);
        args = isArray(result) ? result : false;
      }
      switch (false) {
        case args !== false:
          return;
        case args !== true:
          field = guiContainer.add(obj, name);
          if (typeof val !== "function") {
            field.listen();
          }
          break;
        case !isArray(args):
          addArgs = [obj, name].concat(args);
          guiContainer.add.apply(guiContainer, addArgs).listen();
          break;
        case typeof args !== "object":
          this.add(guiContainer.addFolder(name), obj[name], args);
          break;
        default:
          console.warn("Nothing to do: " + args);
      }
      return guiContainer;
    };

    GameGui.prototype.createGui = function(options) {
      this.gui = new dat.GUI(options);
      this.add(this.gui, this.game, PROPS.game);
      return this.gui;
    };

    return GameGui;

  })(Phaser.Plugin);

}).call(this);
