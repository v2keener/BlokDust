import ConnectionManager = require("../ConnectionManager");
import IEffect = require("../../../../Blocks/IEffect");
import ISource = require("../../../../Blocks/ISource");
import IBlock = require("../../../../Blocks/IBlock");
import AudioChain = require("../AudioChain");

class SimpleConnectionMethod extends ConnectionManager {

    constructor(){
        super();
    }

    /**
     * Original connection style. Sources chain to each of their immediate effects.
     * @returns {AudioChain[]}
     * @constructor
     */
    public CreateChains(): AudioChain[] {
        // for each source
        App.Sources.forEach((source:ISource) => {
            //create audioChain, add to audioChains[]
            let chain:AudioChain = new AudioChain();
            this.Chains.push(chain);

            //Get the source's connections
            const effects: IEffect[] = source.Connections.ToArray();

            // add those connections and the source to this chain.Connections
            chain.Connections.push(source, ...effects);

            // Set all blocks is chained to true
            chain.Connections.forEach((block: IBlock) => {
                block.IsChained = true;
            })
        });

        return this.Chains;
    }
}

export = SimpleConnectionMethod;