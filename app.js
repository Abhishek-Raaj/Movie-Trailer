var url='https://api.themoviedb.org/3/movie/343611?api_key=dcd4e513fbb781a2e86bb06b5750ae70';

var imgurl='https://image.tmdb.org/t/p/w500';

// $(window).load(function() {
//     // Animate loader off screen
//     $(".se-pre-con").fadeOut("slow");
//     $('#loader').display='none';
// });

const input=document.querySelector('#input');
const btn=document.querySelector('#btn');
var moviecontainer=document.querySelector('.movie-container');


// iframe
function createiframe(video)
{
    var frame=document.createElement('iframe');
    frame.src=`https://www.youtube.com/embed/${video.key}`;
    frame.width='350';
    frame.height='315';
    frame.allowFullscreen=true;
    return frame;


}
// fetching
function fetching(url)
{
    fetch(url)
    .then((data)=>{
       return data.json();
    })
    .then((data)=>{
     moviephoto(data.results);
    })
    .catch((error)=>{
       console.log(error);
    });
}


//  function to display photo

function moviephoto(result)
{
    while (moviecontainer.firstChild) {
        moviecontainer.removeChild(moviecontainer.firstChild);
    }
    if(result.length>0)
    {
    result.forEach(data => {
        if(data.backdrop_path!=null)
        {
        var element=`<div class="images">
  <img src='${imgurl}${data.backdrop_path}' alt="image" id="${data.id}"><section>${data.title}</section>
</div>`;
  moviecontainer.innerHTML+=element;
        }  
    });
}
else
{
   moviecontainer.innerHTML=`<h1>Result Not Found</h1>`;
}
}

// add Event Listner to button
btn.addEventListener('click',(e)=>{
    e.preventDefault();
   if(input.value)
{
    url='https://api.themoviedb.org/3/search/movie?api_key=dcd4e513fbb781a2e86bb06b5750ae70';
url=url+`&query=${input.value}`;

fetching(url);
input.value="";
}
else
moviecontainer.innerHTML=`<h1>Please Enter Valid Input</h1>`;
});

var display=document.querySelector('#display');

document.addEventListener('click',function(event){
    const targets=event.target;
    
      if(targets.tagName.toLowerCase()==='img') 
      {
        // console.log(targets.id);
      display.style.display="flex";
      var vurl=`https://api.themoviedb.org/3/movie/${targets.id}/videos?api_key=dcd4e513fbb781a2e86bb06b5750ae70`;
      fetch(vurl)
      .then((data)=>{
      return data.json();
      })
      .then((data)=>{
          console.log(data.results);
          const res=data.results;
          while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
          res.forEach((element,index)=>{
            const video=createiframe(element);
            display.appendChild(video);
          });
         
      })
      .catch((error)=>{
         console.log(error);
      });
      }
});


var x=document.querySelector('#p');
x.addEventListener('click',(e)=>{
   display.style.display="none";
});