import SHMEntity from '../../classes/SHMEntity';
import sampleData from './sampleData.json';

const apiUrl = 'https://api.genderize.io/';

const Genderizer = {

  apiUrl : 'https://api.genderize.io/',
  error : null,
  allowedSlices : 10,
  genderResults : [],

  /**
   * Add the gender to SHMEntities 
   * @param {[type]} SHMEntities [description]
   * @param {[type]} IS_DEV_MODE [description]
   */
  addGender(SHMEntities, IS_DEV_MODE) {

    // Get only the once that can be genderized
    this.genderizableSHMEntities = SHMEntities.filter(this.isGenderizable);

    if (IS_DEV_MODE) {
      return this.fakeRandomResponse(this.genderizableSHMEntities);
      this.genderResults = sampleData;
      return new Promise((resolve) => {this.fetchingResultsComplete(resolve)});
    }
  
    const queryStringArray = this.createQueryStringArray(this.genderizableSHMEntities);

    return new Promise((resolve) => {

      queryStringArray.forEach((e, i) => {
        const queryString = e.join('&');

        setTimeout(() => {

          fetch(this.apiUrl + "?" + queryString)
          .then((response) => response.json())
          .then((json) => {
            if (json.error) {
              this.error = json.error;
            } else {
              this.genderResults.push(json)
            }
            if (i === queryStringArray.length-1) {
              this.fetchingResultsComplete(resolve);
            }
          })
          .catch((e) => {
            this.error = e;
            this.fetchingResultsComplete(resolve);
          })

        }, 200*i);

      });
    });

    // fetch(this.apiUrl + this.createQueryString(SHMEntities))

  },

  fetchingResultsComplete(resolve) {
    if (this.failed) {
      console.warn('Genderizer failed and returned random results. See error below:')
      console.warn(e)
      return this.fakeRandomResponse(this.genderizableSHMEntities);
    }
    const mergedArray = [].concat.apply([],this.genderResults);

    resolve (
      this.genderizableSHMEntities.map(function(elem, i) {
        switch (mergedArray[i].gender) {
          case 'male':
            elem.user.gender = 0;
            break;
          case 'female':
            elem.user.gender = 1;
            break;
          default:
            elem.user.gender = .5;
            break;
        }
        return elem;
      })
    );


    console.log (mergedArray);

  },
  /**
   * @param  {Object}  SHMEntity 
   * @return {Boolean} True is gender can be found
   */
  isGenderizable(SHMEntity) {
    if (SHMEntity.user.cleanName && SHMEntity.user.firstName) {
      return true;
    }
    return false;
  },

  /**
   * Create a string to query api with all given entites
   * @param  {Array} SHMEntities 
   * @return {String} f.e. name[0]=peter&name[1]=lois&name[2]=stevie
   */
  createQueryStringArray(SHMEntities) {
    const queryStrings = SHMEntities.map((element, index) => {
      const indexInString = index - Math.floor((index/this.allowedSlices))*10
      return `name[${indexInString}]=${element.user.firstName}`;
    });

    const arrayOfQueryStringArrays = [];

    for (var i = 0; i <= queryStrings.length; i=i+this.allowedSlices) {
      arrayOfQueryStringArrays.push(queryStrings.slice(i,i+this.allowedSlices));
    }

    return arrayOfQueryStringArrays;
  },

  /**
   * Retruns a fake response giving all entites a Random gender
   * @return {Promise} Resolved after 1.5 sec
   */
  fakeRandomResponse(SHMEntities) {
    return new Promise((resolve) => {
      const SHMEntitiesWithGender = SHMEntities.map(function(SHMEntity) {

        SHMEntity.user.gender = Math.round(Math.random()*10)/10;
        return SHMEntity;
      })
          
      setTimeout(() => {
        resolve(SHMEntitiesWithGender);
      }, 1500);
    })
  }



};

export default Genderizer;