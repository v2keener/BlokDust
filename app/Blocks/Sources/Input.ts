/// <reference path="../../refs.ts" />

import IBlock = require("../IBlock");
import Block = require("../Block");
import IModifier = require("../IModifier");
import Modifiable = require("../Modifiable");

class Input extends Modifiable {

    public Osc: Tone.Oscillator;
    public Envelope: Tone.Envelope;

    constructor(ctx:CanvasRenderingContext2D, position:Point) {
        super(ctx, position);

        this.Osc = new Tone.Oscillator(440, "sine");
        this.Envelope = new Tone.Envelope(0.05, 0.01, 0.4, 0.2); //TODO: Use an envelope to stop clicking on start & stop

        //TODO : Fucking work out how to ramp signals!!!


        this.Osc.output.gain.value = 0.3;

        this.Osc.toMaster(); //TODO: Should connect to a master audio gain output with compression (in BlockView?)

    }

    MouseDown() {
        super.MouseDown();

        // play a sound
        this.Osc.start();
    }

    MouseUp() {
        super.MouseUp();


        // stop a sound

        var _this = this;
        setTimeout(function() {
            _this.Osc.stop();
        }, 100);

    }

    Update(ctx:CanvasRenderingContext2D) {
        super.Update(ctx);
    }

    // input blocks are red circles
    Draw(ctx:CanvasRenderingContext2D) {
        super.Draw(ctx);

        ctx.beginPath();
        ctx.arc(this.Position.X, this.Position.Y, this.Radius, 0, Math.TAU, false);
        ctx.fillStyle = this.IsPressed || this.IsSelected ? "#e17171" : "#f10000";
        ctx.fill();
    }
}

export = Input;