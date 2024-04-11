function LocomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function LoadingAnimation() {
  var tl = gsap.timeline();

  tl.from(".line h1", {
    y: 200,
    duration: 0.8,
    stagger: 0.3,
    delay: 0.4,
  },"-=1.2");

  tl.from(".line2 h5", {
    opacity: 0,
  });

  tl.from(".line-part1", {
    opacity: 0,
    onStart: function () {
      var grow = 0;
      var h5timer = document.querySelector(".line-part1 h5");
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 24);
    },
  });

  tl.to(" .line h2", {
    opacity: 1,
    animationName: "anime",
  });

  tl.to("#loader", {
    opacity: 0,
    delay: 2,
    duration: 0.3,
  });

  tl.from(".page1", {
    delay: 1,
    y: 1600,
    opacity: 0,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from(".nav", {
    opacity: 0,
  });
  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero3 h3,#hero4 h1", {
    y: 120,
    opacity: 0,
    stagger: 0.1,
  });
  tl.from(
    "#hero1,#page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}

function SheryAnimation() {
  Shery.makeMagnet(".nav-part2 h4");
  Shery.imageEffect(".bubble", {
    // style:5,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.7, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8333333333333334 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.47, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}    

function VideoContainer() {
  var video = document.querySelector(".video-container video");
  var videoContainer = document.querySelector(".video-container");
  var videoCursor = document.querySelector(".video-cursor");
  videoContainer.addEventListener("mouseenter", function () {
    gsap.to(".mousefollower", {
      opacity: 0,
    });
    gsap.to(videoCursor,{
      scale: 1,
    })
  });
  videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(videoCursor, {
        x: dets.x - video.getBoundingClientRect().x-900,
        y: dets.y - video.getBoundingClientRect().y-50,
      });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to(videoCursor, {
      scale:0
    });
  });

  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-line"></i>`;
      gsap.to(".video-cursor", {
        scale: '0.6',
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to(".video-cursor", {
        scale: '1',
      });
      flag = 0;
    }
  });
}

function CursorAnimation(){
  Shery.mouseFollower();
  document.addEventListener("mousemove",(dets)=>{
    gsap.to("#flag",{
      x:dets.x,
      y:dets.y
    })
  })
  let hero3= document.querySelector('#hero3')
  hero3.addEventListener('mouseenter',()=>{
    gsap.to('#flag',{
      opacity:1
    })
    gsap.to('.mousefollower',{
      opacity:0
    })
  })
  document.querySelector('#hero3').addEventListener('mouseleave',()=>{
    gsap.to('#flag',{
      opacity:0
    })
    gsap.to('.mousefollower',{
      opacity:1
    })
  })
}


function TextAnimation(){
  
var clutter = ""
var clutter2 = ""
document.querySelector(".page6heading h1").textContent.split("").forEach(function (elem) {
  clutter += `<span>${elem}</span>`
})
document.querySelector(".page6heading h1").innerHTML = clutter
document.querySelector(".page6heading h2").textContent.split("").forEach(function (elem) {
  clutter2 += `<span>${elem}</span>`
})
document.querySelector(".page6heading h2").innerHTML = clutter2


document.querySelector(".page6heading").addEventListener("mouseenter", function () {
  var tl =gsap.timeline()
  tl.to(".page6heading h1 span", {
    opacity: 0,
    stagger: 0.05
  })
  tl.to(".page6arrowsvg",{
    right:"4%"
  })
  gsap.to(".page6heading h2 span", {
    delay: 0.35,
    opacity: 1,
    stagger: 0.1
  })
})
document.querySelector(".page6heading").addEventListener("mouseleave", function () {
  var tl =gsap.timeline()
  tl.to(".page6heading h1 span", {
    opacity: 1,
    stagger: 0.1,
    delay: 0.35,

  })
  tl.to(".page6arrowsvg",{
    right:"8%"
  })
  gsap.to(".page6heading h2 span", {
    opacity: 0,
    stagger: 0.05
  })

})
}




// LocomotiveAnimation(); 
LoadingAnimation();
SheryAnimation()
VideoContainer();
CursorAnimation();
TextAnimation()



