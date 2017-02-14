//import compendium from './compendium.minimal.js';
// import compendium from 'compendium';

const Sentiment = {

	getSentiment(text) {
		// text = "This is shit :D . Test it.. Do it"
		if(!text) return false;
		let profile = {
			'label'      : 'neutral',   // Sentiment: `negative`, `neutral`, `positive`, `mixed`
			'sentiment'  : 0,           // Sentiment score
			'amplitude'  : 0,           // Sentiment amplitude
			'types'      : [],          // Types ('tags') of sentence
			'politeness' : 0,           // Politeness score
			'dirtiness'  : 0,            // Dirtiness score
			'negated'    : 0 			// Is sentence mainly negated
		};

		let analyse = compendium.analyse(text);
		console.log(analyse);
		let labels = [];
		for (let i in analyse)
		{
			labels.push(analyse[i].profile.label);
			profile.types.concat(analyse[i].profile.types);
			profile.sentiment  += analyse[i].profile.sentiment;
			profile.amplitude  += analyse[i].profile.amplitude;
			profile.politeness += analyse[i].profile.politeness;
			profile.dirtiness  += analyse[i].profile.dirtiness;
			profile.negated    += analyse[i].profile.negated? 1:-1;
		}

		profile.label      = this.compareLabels(labels);
		profile.sentiment  = profile.sentiment / analyse.length;
		profile.amplitude  = profile.amplitude / analyse.length;
		profile.politeness = profile.politeness / analyse.length;
		profile.dirtiness  = profile.dirtiness / analyse.length;
		profile.negated    = profile.negated / analyse.length;
		console.log(profile);
		return profile;
	},

	compareLabels(labels)
	{
		let value = 0;
		for (let i = 0; i < labels.length; i++)
		{
			switch(labels[i])
			{
				case 'negative':
					value--;
					break;
				case 'positive':
					value++;
					break;
			}
		}
		if( value < 0)
		{
			return 'negative';
		}
		else if( value > 1 )
		{
			return 'positive';
		}
		else
		{
			return 'neutral';
		}

	}

};

export default Sentiment;
