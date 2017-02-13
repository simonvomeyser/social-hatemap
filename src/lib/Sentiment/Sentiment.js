import './compendium/dist/compendium.minimal.js';

export default class Sentiment{

	get_sentiment(text) {
		let profile = {
			'label'      : 'neutral',   // Sentiment: `negative`, `neutral`, `positive`, `mixed`
			'sentiment'  : 0,           // Sentiment score
			'amplitude'  : 0,           // Sentiment amplitude
			'types'      : [],          // Types ('tags') of sentence
			'politeness' : 0,           // Politeness score
			'dirtiness'  : 0            // Dirtiness score
			'negated'    : 0 			// Is sentence mainly negated
		};

		let analyse = compendium.analyse(text);

		let labels = [];
		for (let i in analyse)
		{
			labels.push(analyse[i].label);
			profile.types.concat(analyse[i].types);
			profile.sentiment  += analyse[i].sentiment;
			profile.amplitude  += analyse[i].amplitude;
			profile.politeness += analyse[i].politeness;
			profile.dirtiness  += analyse[i].dirtiness;
			profile.negated    += analyse[i].negated? 1:-1;
		}

		profile.label      = compare_labels(labels);
		profile.sentiment  = profile.sentiment / analyse.length;
		profile.amplitude  = profile.amplitude / analyse.length;
		profile.politeness = profile.politeness / analyse.length;
		profile.dirtiness  = profile.dirtiness / analyse.length;
		profile.negated    = profile.negated / analyse.length;

		return profile;
	}

	compare_labels(labels)
	{
		let value = 0;
		for (let i = 0; i < labels.length; i++)
		{
			switch(labels[i])
			{
				case 'negative':
					value--
					break;
				case 'positive':
					value++;
					break;
			}
		}
		if( value <= 0)
		{
			return 'positive';
		}
		else if( value >= 1 )
		{
			return 'negative';
		}
		else
		{
			return 'neutral';
		}

	}

}
