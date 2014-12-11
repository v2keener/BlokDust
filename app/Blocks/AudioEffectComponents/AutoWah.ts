import IEffect = require("../IEffect");
import Effect = require("../Effect");
import IModifiable = require("../IModifiable");
import App = require("../../App");


class AutoWahComponent extends Effect implements IEffect {

    public AutoWah: Tone.Filter;

    constructor(frequency: number, type: string, rolloff: number, Q: number) {
        super();
        this.AutoWah = new Tone.Filter(frequency, type, rolloff);
        this.AutoWah.setQ(Q);
    }

    Connect(modifiable:IModifiable): void{
        super.Connect(modifiable);

        this.Modifiable.Source.connect(this.AutoWah);
        this.AutoWah.connect(this.Modifiable.OutputGain);

    }

    Disconnect(modifiable:IModifiable): void {
        super.Disconnect(modifiable);

        this.Modifiable.Source.disconnect();
        this.Modifiable.Source.connectSeries(this.Modifiable.Source, this.Modifiable.Delay, this.Modifiable.OutputGain, App.AudioMixer.Master);

    }
}

export = AutoWahComponent;