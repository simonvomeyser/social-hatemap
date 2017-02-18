/**
 * Statusses : EMPTY, NOT_READY, FINISHED
 */
class SHMEntity {

  constructor()  {
    this.status   = "EMPTY";
  }

  setNotReady() {
    this.status   = "NOT_READY";
  }
  setFinished() {
    this.status   = "READY";
  }

}

export default SHMEntity;
