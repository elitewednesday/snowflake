window.onload = () => {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.style.display = 'block';

    // Define multiple colors for the fireworks
    const colors = ['#FF0000', '#FF6347', '#FFD700', '#00FF00', '#1E90FF', '#8A2BE2', '#FF1493'];

    // Generate fireworks
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Random position on screen
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.left = `${Math.random() * 100}vw`;

        // Random color selection from the array
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random delay for each firework to make it appear at different times
        firework.style.animationDelay = `${Math.random() * 1}s`;

        // Random size for each firework
        firework.style.width = `${Math.random() * 15 + 10}px`; // Size between 10px and 25px
        firework.style.height = firework.style.width;

        fireworksContainer.appendChild(firework);
    }

    // Hide fireworks after 5 seconds
    setTimeout(() => {
        fireworksContainer.style.display = 'none';
    }, 5000);
    
    // Navbar toggle functionality for small screens
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');

    navbarToggler.addEventListener('click', () => {
        navbarNav.classList.toggle('active');
    });
};

// Select elements
const carousel = document.querySelector(".carousel");
const firstImage = carousel.querySelector("img");
const arrowIcons = document.querySelectorAll(".wrapper i");

// Variables for state management
let isDragging = false;
let startX = 0;
let scrollStart = 0;
let scrollDiff = 0;

// Helper function to toggle arrow visibility
const toggleArrowIcons = () => {
  setTimeout(() => {
    const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
    arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
    arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
  }, 100);
};

// Helper function to smoothly scroll the carousel
const scrollCarousel = (direction) => {
  const cardWidth = firstImage.clientWidth + 14; // Image width + margin
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const scrollAmount = direction === "right" ? cardWidth : -cardWidth;

  carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);

  toggleArrowIcons();
};

// Event listeners for arrows
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const direction = icon.id === "right" ? "right" : "left";
    scrollCarousel(direction);
  });
});

// Automatic adjustment after dragging
const autoCenterImage = () => {
  const cardWidth = firstImage.clientWidth + 14;
  const offset = carousel.scrollLeft % cardWidth;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
    if (offset > cardWidth / 3) {
      carousel.scrollLeft += cardWidth - offset; // Snap to the next image
    } else {
      carousel.scrollLeft -= offset; // Snap to the previous image
    }
  }

  toggleArrowIcons();
};

// Dragging logic
const startDragging = (event) => {
  isDragging = true;
  startX = event.pageX || event.touches[0].pageX;
  scrollStart = carousel.scrollLeft;
  carousel.classList.add("dragging");
};

const duringDrag = (event) => {
  if (!isDragging) return;

  const currentX = event.pageX || event.touches[0].pageX;
  scrollDiff = currentX - startX;

  carousel.scrollLeft = scrollStart - scrollDiff;
};

const stopDragging = () => {
  if (!isDragging) return;

  isDragging = false;
  carousel.classList.remove("dragging");

  if (Math.abs(scrollDiff) > 10) {
    autoCenterImage();
  }
};

// Attach event listeners
carousel.addEventListener("mousedown", startDragging);
carousel.addEventListener("touchstart", startDragging);

document.addEventListener("mousemove", duringDrag);
carousel.addEventListener("touchmove", duringDrag);

document.addEventListener("mouseup", stopDragging);
carousel.addEventListener("touchend", stopDragging);

// Initial setup
toggleArrowIcons();

const stars = document.querySelectorAll('.star');
const userRatingDisplay = document.getElementById('user-rating');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-value');
        updateRating(rating);
    });
});

function updateRating(rating) {
    // Remove the "selected" class from all stars
    stars.forEach(star => {
        star.classList.remove('selected');
    });

    // Add the "selected" class to the clicked star and all preceding stars
    for (let i = 0; i < rating; i++) {
        stars[i].classList.add('selected');
    }

    // Display the user's selected rating
    userRatingDisplay.textContent = rating;
}

//CLick to enlarge Effect
const mediaImages = document.querySelectorAll('.media-img');

mediaImages.forEach(img => {
    img.addEventListener('click', () => {
        img.classList.toggle('enlarged');
    });
});

// Function to display the "not allowed" message
function showMessage() {
  const overlay = document.querySelector('.overlay');
  const message = document.querySelector('.message');
  overlay.style.display = 'block';
  message.style.display = 'block';
  
  // Hide the message after 2 seconds
  setTimeout(() => {
    overlay.style.display = 'none';
    message.style.display = 'none';
  }, 2000);
}

// Function to intercept download clicks
function disableDownloadOnVideos(videos) {
  videos.forEach(video => {
    video.addEventListener('contextmenu', event => {
      // Prevent right-click
      event.preventDefault();
      showMessage();
    });

    // Intercept the download click
    video.addEventListener('loadeddata', () => {
      const downloadBtnSelector = 'button[title="Download"], a[title="Download"]';
      const shadowRoot = video.shadowRoot || video;

      // Check and disable the download button
      const observer = new MutationObserver(() => {
        const downloadBtn = shadowRoot.querySelector(downloadBtnSelector);
        if (downloadBtn) {
          downloadBtn.onclick = (e) => {
            e.preventDefault();
            showMessage();
          };
        }
      });

      // Observe for changes in the video controls
      observer.observe(video, { childList: true, subtree: true });
    });
  });
}

// Apply restrictions to all images and videos on the page
const images = document.querySelectorAll('img');
const videos = document.querySelectorAll('video');

images.forEach(image => {
  image.addEventListener('contextmenu', event => {
    event.preventDefault();
    showMessage();
  });
});

disableDownloadOnVideos(videos);

document.addEventListener("DOMContentLoaded", () => {
  // Add lazy loading to all images
  const images = document.querySelectorAll("img:not([loading])");
  images.forEach(img => {
    img.setAttribute("loading", "lazy");
  });

  // Lazy load videos using IntersectionObserver
  const videos = document.querySelectorAll("video");

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const sources = video.querySelectorAll("source");

          sources.forEach(source => {
            if (source.dataset.src) {
              source.src = source.dataset.src;
            }
          });

          video.load();
          observer.unobserve(video); // Stop observing once loaded
        }
      });
    });

    videos.forEach(video => {
      const sources = video.querySelectorAll("source");
      sources.forEach(source => {
        // Use a data-src attribute for lazy loading
        if (!source.dataset.src) {
          source.dataset.src = source.src;
          source.src = ""; // Clear the immediate load
        }
      });

      videoObserver.observe(video);
    });
  } else {
    // Fallback: Immediately load all videos (for older browsers)
    videos.forEach(video => {
      video.load();
    });
  }
});
