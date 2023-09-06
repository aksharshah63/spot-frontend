<template>
  <div>
    <div class="d-flex align-center">
      <v-avatar color="primary" size="110">
        <img :src="event.photo_url" style="object-fit: cover;" alt="Event" />
      </v-avatar>
      <div class="ml-auto text-center">
        Visites de {{ event.name }}
        <div class="text-h3">{{ event_memories.length }}</div>
        <div v-if="event_memories.length" class="text-h6">
          Souvenirs blockchainisés depuis le
          {{ new Date(event_memories[0].updatedAt).toLocaleDateString() }}
        </div>
      </div>
    </div>

    <div class="my-12 d-flex flex-wrap">
      <img v-for="m in event_memories" :key="m._id" width="100" :src="m.user_photo_url" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      event: {},
      event_memories: [],
    };
  },
  mounted() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.push({ name: "UserLogin" });
    } else {
      const event = JSON.parse(localStorage.getItem("event_json"));
      const { uniq_code } = event;

      this.event = event;

      axios
        .post(
          this.$hostname + "user/get_event_memories",
          {
            uniq_code,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }
        )
        .then(response => {
          this.event_memories = response.data;
        })
        .catch(() => {
          this.$toast.open({
            message: "Something Went Wrong!",
            type: "error",
          });
        });
    }
  },
};
</script>
