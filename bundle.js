var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("dataObjects", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Size = void 0;
    var Size = /** @class */ (function () {
        function Size(w, h) {
            this.width = w;
            this.height = h;
        }

        return Size;
    }());
    exports.Size = Size;
})
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1() { }
    exports.default = default_1;
});
define("index", ["require", "exports", "main", "dataObjects"], function (require, exports, main_1, dataObjects_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Engine = void 0;
    main_1 = __importDefault(main_1);
    var Engine = /** @class */ (function () {
        function Engine(canvasElement, canvasRender, language) {
            this.objects = [];
            this.view = canvasElement;
            this.render = canvasRender;
            this.language = language;
            this.draw();
            main_1.default();
        }
        Object.defineProperty(Engine.prototype, "viewSize", {
            get: function () {
                return new dataObjects_1.Size(this.view.width, this.view.height);
            },
            enumerable: false,
            configurable: true
        });
        Engine.prototype.drawText = function (x, y, text, color, size) {
            if (text === void 0) { text = "Empty Text"; }
            if (size === void 0) { size = 16; }
            this.render.fillStyle = color;
            this.render.font = size + "px 'default'";
            this.render.fillText(text, x, y);
        };
        Engine.prototype.drawShadowText = function (x, y, text, color, shadowColor, size, shadowSize) {
            if (text === void 0) { text = "Empty Text"; }
            if (color === void 0) { color = "#109eff"; }
            if (shadowColor === void 0) { shadowColor = "#fff"; }
            if (size === void 0) { size = 16; }
            if (shadowSize === void 0) { shadowSize = 1; }
            for (var sizeCount = 0; sizeCount <= shadowSize; sizeCount++) {
                this.render.fillStyle = shadowColor;
                this.render.font = size + "px 'default'";
                this.render.fillText(text, x + sizeCount, y + sizeCount);
            }
            this.render.fillStyle = color;
            this.render.font = size + "px 'default'";
            this.render.fillText(text, x, y);
        };
        Engine.prototype.error = function (title, msg) {
            if (msg === void 0) { msg = "Unknown Error"; }
            this.drawShadowText(0, 0, "[!] Error catch in console", "#f00", "#fff", 18);
            console.error("\nError " + title + ":\n" + msg);
        };
        Engine.prototype.draw = function () {
            var _this = this;
            this.render.fillStyle = "#000";
            this.render.fillRect(0, 0, this.viewSize.width, this.viewSize.height);
            // this.render.fillStyle="#f00"
            this.render.textAlign = "left";
            this.render.textBaseline = "top";
            if (this.objects.length === 0) {
                this.error("noObjects", this.language.errors.noObjects);
                return;
            }
            requestAnimationFrame(function () {
                _this.draw();
            });
        };
        Engine.prototype.update = function () { };
        return Engine;
    }());
    exports.Engine = Engine;
});
define("langs/zhHans", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        errors: { noObjects: "没有可渲染对象" },
    };
});
