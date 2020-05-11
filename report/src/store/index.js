class ReportStore {
  constructor () {
    this.state = {
      globalUpate: 0,
      globalVariables: [],
      filterArgs: {},
      filterDatas: []
    }
  };

  setFilterArgs (value) {
    const {
      state
    } = this;
    state.filterArgs = value;
  }

  setFilterDatas (value) {
    const {
      state
    } = this;
    state.filterDatas = value;
  }

  setGlobalVarible (value) {
    const {
      state
    } = this;
    state.globalVariables = value;
  }

  addGlobalVarible (item) {
    const {
      state
    } = this;
    state.globalVariables.push(item)
  }

  updateGlobalVarible ({
    property,
    item
  }) {
    const {
      state
    } = this;
    state.globalVariables.forEach((vo) => {
      if (vo.id === item.id) {
        if (Object(item[property]) === item[property]) {
          vo[property] = Array.isArray(item[property]) ? [...item[property]] : {
            ...item[property]
          };
        }
      } else {
        vo[property] = item[property];
      }
    })
  }

  delGlobalVarible (id) {
    const {
      state
    } = this;
    state.globalVariables.forEach((item, index) => {
      if (item.id === id) state.globalVariables.splice(index, 1);
    })
  }
}

export default ReportStore;
