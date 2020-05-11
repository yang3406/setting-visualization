const editor = {
  namespaced: true,
  state: {
    curDragObj: {},
    checkedArea: {
      posX: 0,
      posY: 0,
      width: 0,
      height: 0,
      rotate: 0
    },
    checkedList: [],
    checkedListIndex: [],
    reportScroll: {
      top: 0,
      left: 0
    },
    assistLine: {
      verSHow: false,
      verTop: 0,
      verLeft: 0,
      verWidth: 0,
      horShow: false,
      horTop: 0,
      horLeft: 0,
      horHeight: 0
    },
    scaling: 1,
    reportVm: null,
    reportData: [],
    reportAttr: {
      name: '内容',
      width: 1920,
      height: 1080,
      bgColor: 'rgba(28,25,42,1)',
      bgImg: '',
      bgImgState: 'width',
      themeColor: -1,
      themeColors: [
        ['green', 'yellow', 'red']
      ],
      themeType: 0,
      layerHoverIndex: null,
      curHistory: 0,
      histortData: [],
      historyCheckedListIndex: [],
      libsClipboard: [],
      previewData: [],
      carouselInitIndex: '',
      elCarouselPlayState: true,
      imgs: [],
      // themeColors: [], // 设置大屏管理画布主题颜色
      globalVariables: [], // 全局变量组件的数据
      globalUpdate: 0, // 用来触发全局数据变化
      isShowScaleReport: true, // 是否显示画布的缩小图
      filterArgs: {}, // 全局过滤参数
      filterDatas: [], // 用来更新全局过滤参数
      historyColors: [] // 历史使用过的颜色

    }
  },
  mutations: {
    // 设置当前拖动对象
    setCurDragObj (state, obj) {
      state.curDragObj = obj;
    },
    // 设置图层 hover
    layerHover (state, index) {
      state.layerHoverIndex = index;
    },
    layerBlur (state) {
      state.layerHoverIndex = null;
    },
    clearChecked (state) {
      state.checkedList = [];
      state.carouselInitIndex = [];
    },
    updateCheckedArea (state, obj) {
      Object.keys(obj).forEach((key) => {
        state.checkedArea[key] = obj[key];
      })
      // 设置单个时候的选择旋转
      if (state.checkedList.length === 1) {
        state.checkedArea.rotate = state.checkedList[0].locating.rotate;
      } else {
        state.checkedArea.rotate = 0;
      }
    },
    setReportVm (state, vm) {
      state.reportVm = vm;
    },
    setReportData (state, value) {
      state.reportData = value.map((item, index) => ({
        ...item,
        layerLevel: index + 1
      }))
    },
    addReportData (state, item) {
      state.reportData.push({
        ...item,
        layerLevel: state.reportData.length + 1
      });
    }

  }
}

export default editor;
