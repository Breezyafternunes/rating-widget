<script type="text/discourse-plugin" version="0.8">
  const currentUser = api.getCurrentUser();

  api.registerTopicFooterButton({
    id: "discourse-custom-topic-button",
    priority: 0,
    icon() {
      if (settings.custom_topic_button_icon.length) {
        return settings.custom_topic_button_icon;
      }
    },
    translatedLabel() {
      return settings.custom_topic_button_title;
    },
    translatedTitle() {
      return settings.custom_topic_button_label;
    },
    action() {
      const topicButtonUrl = settings.custom_topic_button_url;
      let url = topicButtonUrl

      if (this.topic) {
        url = url
          .replace("<TOPIC_ID>", this.topic.id)
          .replace("<TOPIC_TITLE>", this.topic.title)
          .replace("<TOPIC_SLUG>", this.topic.slug);
      }

      if (currentUser) {
        url = url
          .replace("<USER_ID>", currentUser.id)
          .replace("<USERNAME>", currentUser.username)
      }

      window.open(url, "_blank");
    },
    dropdown() {
      return this.site.mobileView;
    },
    classNames: ["discourse-custom-topic-button"],
    dependentKeys: ["topic.id", "topic.title", "topic.slug"],
    displayed() {
      return settings.custom_topic_button_enabled;
    }
  });
</script>
