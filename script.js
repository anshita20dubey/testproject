function loco()
{
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
loco()
var tl = gsap.timeline()

var main = document.querySelector("#main")
var h1 = document.querySelector("#page1>h1")
var cursor = document.querySelector("#cursor")

main.addEventListener("mousemove",function(blah)
{
    cursor.style.top = blah.y + 30 + "px"
    cursor.style.left = blah.x + 30 + "px"
    h1.style.color = "salmon"
})
h1.addEventListener("mouseenter",function()
{
   cursor.style.scale = 3
})
h1.addEventListener("mouseleave",function()
{
   cursor.style.scale = 1  
})
tl.from("#nav h1,#nav #h5s, #nav #usa",
{
   y: -100,
   stagger: 0.5,
   duration: 1,
   opacity: 0,
})
tl.from("#page1>h1",
{
  x:-100,
  stagger: 0.5,
   duration: 1,
   opacity: 0,
})
document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),
    {
      opacity: 0,
      ease: Power4,
      duration:0.5,
    });
  });
  elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"),
    {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate:gsap.utils.clamp(-20,20,diffrot*0.5),
    });
  });

});