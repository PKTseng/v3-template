<template>
  <v-list-item class="mb-0 pl-3" style="justify-content: center">
    <v-avatar class="company-logo-group">
      <v-img :src="imgSrc" />
    </v-avatar>

    <!--
    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h3" style="color:var(--v-info-base);">
      </v-list-item-title>
    </v-list-item-content>
    -->
  </v-list-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imgSrc = ref(
  'image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQhSURBVHic7ZldaBxVGIbf78yZbPO/7drU6BbTrRhsqYaCVZRAVRDthT/1xl7UGvBOqo3GgOSnSxsLZptKUAS1YLDVVnpTQSxaq6KQCpYi3misUdINdLNBYjfpbjJ/xwvdMrM7u1vM7mw2Oc/dvOednff7OOfM7AwgkUgkEolEIlmZkJu4Oxxp4qa4UxCavA60GAikmaZ1JaWmfjoVDms3do6Njp6h+wWzDgLYDoCVIKNXJEB0jBv84NFD+6byGa83oKM38pogDKCyC88kBos9NfL6Kz/kMhAA7OkdfIGI3vYul6fMQIh7Rwa6L7kN8md7jtxKZA5mDtyyNoB1AT8YVc6E0HQdE7E4EnNJu7waRO8BeNDtHM4Ucy8EatJCta8Kz+98DFtubylt2hJhmCZOfzOKL89ftMvbO8KDWz8Id1/M9DMIscMu7HzogYotHgC4ouDph9vR2hJ0Dphsh5ufCdAGu3B368bSpfMIIqDtDmcdAtjg5uUE1NkFf31tlumL8bOIJqJFCxj0r0fDqvqi/BYjho2NIaytvsmh+xsy6iBrU0d/5AnBaGwk3PVrWuaFLvDi5534Lea6gf5vfP4qKL6Cl75hVKaif1sPNgc25TYJuk8Ap2EKPNcX+d4U2HNs4NU/C27xl6Z+L1rQUqFbOr6e/NahFbh7tTPCd7vDkaaCDRBCLC6dRyyY847j25qbwLmS009AkJvoKd48XGKsaazHS7uexPmff8GCpgMAZmZn8cdk7LpHgB5ftg0AgNaWoON2uKDp2PvGOzaHaK6cx7wioChZ5VbQc26JkA0od4ByIxtQ7gDlhhua89VZMpnMYV3aCCEKZjdME/Z6BcD4fHLOYYrH4yUJWGosyyqYnYiQUS9f8UtANqDcAcqNbEC5A5SbFd+AZf13mIhw9VoKum4AAOIzf2eOi2XbACLC8IlPEZv+K6eHMRZfNkuAMj50X72Wyls8ABBX+wo2oK4m+zX5UiRUG3Icp6e9KwSoPt+7Jw/vf7/gEuhqexnHxz9GYj6x6JBpgoEgGmsaivJbBEKoNoSt1W35fcRMpihRIjbOwfuPH+4dBVw2QSJyvAm+edU6dG3uLEpYL9EM5wxgihL95M0DWV+HGDHmcM6l5jM9FcnYxKTjmIhNu/mYwpTLduHDz7769+NaBZPSdJwbveDQiHDGzcuZwodh6MNpIXoljsjIKTzavg3NgdVZu+tSRjMMjE1M4tzoBZi2ZUyMGUzDkNs5BADPdPZdNgxjvUc5PYagVvkiJ4b2d7uNMgCoqw7cwxQ2620wLyBwlZ/NVTzwXwOOHto3pZpqkKu+HytpyueDGDPUKl/k5JEDj+T1ZQq7usJ3QaDbssQWAbGmdBGLDwEGEZsmwhmmYeijt8LFe3iRSCQSiUQikUgkkuXEP2m+Mm+EWwyMAAAAAElFTkSuQmCC'
) // Assuming you'll bind some dynamic image source
</script>

<style scoped>
.company-logo-group {
  margin-right: 0px !important;
}

.company-name-sub-title {
  font-size: 0.75em;
}
</style>
