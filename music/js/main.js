
const vm = new Vue({
  el: '#player',
  data: {
    query: "",
    musicList: [],
    musicUrl:'',
    musicCover:[],
    hotComments:[],
    isPlaying:false,
    isShow:false,
    mvUrl:''
  },
  methods: {
    searchMusic() {
      let that = this
      axios.get('https://autumnfish.cn/search?keywords=' + this.query)
        .then(function (response) {
          that.musicList = response.data.result.songs
        
        }, function (err) { })

    },
    playMusic(musicId){
      let that = this
      axios.get('https://autumnfish.cn/song/url?id='+ musicId)
        .then(function (response) {
          that.musicUrl = response.data.data[0].url

        }, function (err) { 
          
        })
        axios.get('https://autumnfish.cn/song/detail?ids='+ musicId)
        .then(function (response) {
          that.musicCover = response.data.songs[0].al.picUrl

        }, function (err) { 
          
        })
        axios.get('https://autumnfish.cn/comment/hot?type=0&id='+ musicId)
        .then(function (response) {
          
          that.hotComments = response.data.hotComments
          
        }, function (err) { 
          
        })
    },
    play(){
      this.isPlaying = true
    },
    pause(){
      this.isPlaying = false
    },
    playMv(mvId){
      let that = this
      axios.get('https://autumnfish.cn/mv/url?id='+ mvId)
        .then(function (response) {
          
          that.mvUrl = response.data.data.url
          that.isShow = true
        }, function (err) { 
          
        })
    },
    hide(){
      this.isShow = false
    }

  }
})
