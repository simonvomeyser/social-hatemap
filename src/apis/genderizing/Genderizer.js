const apiUrl = '';

const Genderizer = {

  /**
   * Add the gender to SHMEntities 
   * @param {[type]} SHMEntities [description]
   * @param {[type]} IS_DEV_MODE [description]
   */
  addGender(SHMEntities, IS_DEV_MODE) {
    if (!IS_DEV_MODE) {
      console.error("Genderizer not working in live mode!")
    }

    return new Promise((resolve) => {

      const SHMEntitiesWithGender = SHMEntities.map(function(SHMEntity) {
        SHMEntity.user.gender = Math.round(Math.random() * 2 -1);
        return SHMEntity;
      })
          
      setTimeout(() => {
        resolve(SHMEntitiesWithGender);
      }, 1500);
    })

  }

};

export default Genderizer;