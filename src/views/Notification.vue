<template>
  <div>
    <el-page-header :content="通知" @back="goBack" style="color: white" />
    <el-tabs v-model="tabsName" @tab-click="handleClick">
      <el-tab-pane label="收到的回帖" name="commented">
        <div class="infinite-list-wrapper" style="overflow: auto; height: 480px">
          <el-backtop
            target=".infinite-list-wrapper"
            :bottom="20"
            :right="20"
            :visibility-height="100"
          ></el-backtop>
          <div v-infinite-scroll="load" infinite-scroll-disabled="loadDisabled">
            <template v-for="item in list" :key="item.oId">
              <el-row :class="{ read: item.hasRead }">
                <el-divider style="margin: 12px 0">{{
                  item.commentArticleTitle
                }}</el-divider>
                <el-row class="flex-cloumn avatar-cloumn">
                  <el-avatar
                    size="default"
                    :src="item.commentAuthorThumbnailURL"
                  ></el-avatar>
                  <el-row>{{ item.commentAuthorName }}</el-row>
                </el-row>
                <el-row class="flex-cloumn content-cloumn">
                  <el-row class="content"
                    ><span v-html="item.commentContent"></span
                  ></el-row>
                  <el-row class="time">{{
                    getDateTime(item.commentCreateTime)
                  }}</el-row>
                </el-row>
              </el-row>
            </template>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收到的回复" name="reply"></el-tab-pane>
      <el-tab-pane label="提及我的" name="at"></el-tab-pane>
      <el-tab-pane label="我关注的" name="following"></el-tab-pane>
      <el-tab-pane label="积分" name="point"></el-tab-pane>
      <el-tab-pane label="同城" name="broadcast"></el-tab-pane>
      <el-tab-pane label="系统" name="sys-announce"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNotifications } from '../api/notification'
import { getDateTime } from '../utils/util'

export default {
  name: 'Notification',
  data() {
    return {
      tabsName: 'commented',
      p: 1,
      loadDisabled: true,
      list: [],
    }
  },
  computed: {
    ...mapGetters(['key']),
    params() {
      return { apiKey: this.key, type: this.tabsName, p: this.p }
    },
  },
  created() {
    this.load()
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ChatRoom' })
    },
    handleClick() {
      this.p = 1
      this.load()
    },
    load() {
      getNotifications(this.params).then((res) => {
        if (0 === res.code) {
          this.list = res.data
          this.loadDisabled = false
        }
      })
    },
    getDateTime(str) {
      return getDateTime(str)
    },
  },
}
</script>

<style scoped>
.flex-cloumn {
  flex-direction: column;
  color: white;
  margin: 3px 0;
}
.content-cloumn {
  flex: 1;
  padding: 0 20px;
}
.avatar-cloumn {
  align-items: center;
  width: 100px;
  font-size: 15px;
}
.title {
  font-weight: bold;
  font-size: 14px;
}
.content {
  padding: 3px 0;
  flex: 1;
}
.content * {
  max-width: 255px;
  overflow: auto;
}
.time {
  justify-content: flex-end;
}
.read {
  opacity: 0.5;
}
</style>
