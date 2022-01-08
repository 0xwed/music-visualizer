var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var audio;
var audioContext;
var analyser;
var source;
var notesStyleProperties;
var notesCount;
var notes;
/*
    vw - 1% of display width
    vh - 1% of display height
    vmin - 1% of the smallest display side
    vmax - 1% of the largest display side
*/
var vw = function (f) {
    if (f === void 0) { f = 1; }
    return clientWidth / 100 * f;
};
var vh = function (f) {
    if (f === void 0) { f = 1; }
    return clientHeight / 100 * f;
};
var vmin = function (f) {
    if (f === void 0) { f = 1; }
    return vw() > vh() ? vh(f) : vw(f);
};
var vmax = function (f) {
    if (f === void 0) { f = 1; }
    return vw() < vh() ? vh(f) : vw(f);
};
var AbstractCanvasElement = /** @class */ (function () {
    function AbstractCanvasElement(ctx, properties) {
        this.ctx = ctx;
        this.x = properties.x;
        this.y = properties.y;
        this.width = properties.width;
        this.height = properties.height;
        this.fillStyle = properties.fillStyle;
        this.strokeStyle = properties.strokeStyle;
        this.lineWidth = properties.lineWidth;
    }
    AbstractCanvasElement.prototype._Draw = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    AbstractCanvasElement.prototype._Update = function () { };
    AbstractCanvasElement.prototype.Render = function () {
        this._Draw();
        this._Update();
    };
    return AbstractCanvasElement;
}());
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Note.prototype.SetPitchOfNote = function (height) {
        this.height = height;
    };
    return Note;
}(AbstractCanvasElement));
var AbstractNotes = /** @class */ (function () {
    function AbstractNotes(_a) {
        var ctx = _a.ctx, notesCount = _a.notesCount, notesStyleProperties = _a.notesStyleProperties;
        this.ctx = ctx;
        this.count = notesCount;
        this.x = notesStyleProperties.x;
        this.y = notesStyleProperties.y;
        this.width = notesStyleProperties.width;
        this.height = notesStyleProperties.height;
        this.gap = notesStyleProperties.gap;
        this.notes = [];
        this.noteProperties = {
            x: notesStyleProperties.x,
            y: notesStyleProperties.y,
            width: this.getNoteWidth(),
            fillStyle: notesStyleProperties.fillStyle
        };
        this.createNotes();
    }
    AbstractNotes.prototype.getNoteWidth = function () {
        var noteWidth = (this.width - this.gap * this.count) / this.count;
        return noteWidth;
    };
    AbstractNotes.prototype.changeNotePositionX = function () {
        this.noteProperties.x += this.noteProperties.width + this.gap;
    };
    AbstractNotes.prototype.createNotes = function () {
        for (var i = 0; i < this.count; i++) {
            this.notes.push(new Note(this.ctx, this.noteProperties));
            this.changeNotePositionX();
        }
    };
    return AbstractNotes;
}());
var Notes = /** @class */ (function (_super) {
    __extends(Notes, _super);
    function Notes(_a) {
        var ctx = _a.ctx, notesCount = _a.notesCount, notesStyleProperties = _a.notesStyleProperties;
        return _super.call(this, { ctx: ctx, notesCount: notesCount, notesStyleProperties: notesStyleProperties }) || this;
    }
    Notes.prototype.Play = function (analyser) {
        var fbcArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbcArray);
        this.notes.forEach(function (note, i) {
            var index = i + i % 3;
            var height = -(fbcArray[index] / 2);
            note.SetPitchOfNote(height);
            note.Render();
        });
    };
    return Notes;
}(AbstractNotes));
function Play() {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    audio.play();
}
function Stop() {
    audio.pause();
}
function ResizeCanvas() {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
}
function ClearCanvas() {
    ctx.fillRect(0, 0, clientWidth, clientHeight);
}
function FillCanvas(opacity) {
    if (opacity === void 0) { opacity = 1; }
    ctx.fillStyle = "rgba( 0, 0, 0, " + opacity + " )";
    ctx.fillRect(0, 0, clientWidth, clientHeight);
}
function DrawCanvas() {
    notes.Play(analyser);
}
function RenderCanvas() {
    requestAnimationFrame(function () {
        // ClearCanvas ()
        FillCanvas();
        DrawCanvas();
        RenderCanvas();
    });
}
function PlayerInit(audioPath) {
    if (audioPath === void 0) { audioPath = "src/audio.mp3"; }
    audio = new Audio(audioPath);
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    ResizeCanvas();
    RenderCanvas();
    var playButton = document.createElement("button");
    var stopButton = document.createElement("button");
    playButton.textContent = "Play";
    stopButton.textContent = "Stop";
    playButton.addEventListener("click", Play);
    stopButton.addEventListener("click", Stop);
    document.body.append(playButton, stopButton, audio, canvas);
}
notesStyleProperties = {
    x: vw(0),
    y: vh(100),
    width: vw(100),
    gap: vmin(0.1),
    fillStyle: "white"
};
notesCount = 300;
notes = new Notes({ ctx: ctx, notesCount: notesCount, notesStyleProperties: notesStyleProperties });
window.addEventListener("load", function () { return PlayerInit(); });
window.addEventListener("resize", function () { return ResizeCanvas(); });
