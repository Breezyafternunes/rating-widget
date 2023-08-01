<script>
  // Function to save the rating via the Discourse API
  function saveRating(postID, ratingValue) {
    const ratingField = "rating";
    api.ajax(`/posts/${postID}/custom_fields`, {
      type: "PUT",
      data: {
        custom_fields: {
          [ratingField]: ratingValue.toString(),
        },
      },
    });
  }

  // Function to handle the rate button click and show the pop-up dialog
  function handleRateButtonClick(postID, topicID) {
    // Show the pop-up dialog when the button is clicked
    $("#ratingDialog").show();

    // Handle the rating stars interaction
    $(".rating-stars .star").hover(
      function () {
        $(this).prevAll(".star").addClass("active");
        $(this).addClass("active");
      },
      function () {
        $(this).prevAll(".star").removeClass("active");
        $(this).removeClass("active");
      }
    );

    // Handle the submit button click
    $(".submit-button").click(function () {
      // Get the selected rating value
      const ratingValue = $(".rating-stars .star.active").data("rating");

      // Hide the pop-up dialog after submission
      $("#ratingDialog").hide();

      // Pass the ratingValue and postID to the function for saving the rating
      saveRating(postID, ratingValue);
    });
  }

  // Function to initialize the rate button and pop-up dialog
  function initializeRateButton() {
    $(".btn-default.topic-footer-button.discourse-custom-topic-button.btn.btn-icon-text").click(function () {
      const postID = $(this).data("post-id");
      const topicID = $(this).data("topic-id");
      handleRateButtonClick(postID, topicID);

      // Prevent the default behavior of the "Rate" button
      return false;
    });

    const categoriesToTarget = [".category-mock-library-of-catechesis", ".category-library"];

    categoriesToTarget.forEach((categorySelector) => {
      $(categorySelector).find(".topic-list-item").each(function () {
        if ($(this).find(".rate-button").length === 0) {
          const topicID = $(this).data("topic-id");
          const postID = $(this).data("post-id");
          const rateButton = `
            <button class="rate-button btn-default topic-footer-button discourse-topic-group-button btn btn-icon-text" data-topic-id="${topicID}">
              Rate
            </button>
          `;
          $(this).find(".title").append(rateButton);
        }
      });

      // Add a click event handler to the "Rate" button using the class selector
      $(categorySelector).on("click", ".rate-button", function () {
        const topicID = $(this).data("topic-id");
        const postID = $(this).closest(".topic-list-item").data("post-id");
        handleRateButtonClick(postID, topicID);
      });
    });
  }

  // Execute the initialization function when the page changes
  api.onPageChange(initializeRateButton);
</script>
