//var jqueryNoConflict = jQuery;
var fs=require('fs'),
    xml2js = require('xml2js'),
    Handlebars=require('./lib/handlebars.js');
var temp=new Array();
var litag='';
//var parser = new xml2js.Parser();
/*fs.readFile( './junitresults.xml', function(err, data) {
 parser.parseString(data, function (err, result) {
 var stream=fs.createWriteStream("./junit-results.json");
 stream.write(JSON.stringify(result));
 stream.end();

 });
 });*/
//var reportpath='./reports/firefox';
//var filename='index.html';

function createhtml(reportpath,filename)
{



registercounterhelper();
registerdescriptionhelper();
registertestcasehelper();
registertestresulthelper();
registerscreenshothelper();
testcaseidhelper();
checkconditionhelper();
endtaghelper();

var source=fs.readFileSync('./templates/dataDetailsTemplate.handlebars','utf8');
//  console.log("vijay");


//console.log("vijay");
var temp=fs.readFileSync(reportpath+'/combined.json','utf-8');
temp = '{"results":'+temp;
temp +='}';
var data=JSON.parse(temp);

var html=Handlebars.compile(source)(data);

var indexfile=fs.createWriteStream(reportpath+'/'+filename);
indexfile.write(html.toString());
indexfile.end();

}
function registercounterhelper()
{
    var increase=1;
    Handlebars.registerHelper('counter',function(){
        return increase++;
    });

};

function registerdescriptionhelper()
{
    Handlebars.registerHelper('descriptionfilter',function(desc){
        var descrip=desc.split('|').reverse();
        return descrip[0];

    });
}

function registertestcasehelper()
{
    Handlebars.registerHelper('testcasefilter',function(desc){

        var descrip=desc.split('|');
        return descrip[0];

    });
}

function registertestresulthelper()
{
    Handlebars.registerHelper('resultfilter',function(result){
        if(result==true)
        {
            return 'Pass';

        }else
        {
            return 'Fail';
        }


    });
}

function registerscreenshothelper()
{
    Handlebars.registerHelper('screenshotfilter',function(link){
        var temp=link.split("\\").reverse();
        return temp[0];


    });
}

function testcaseidhelper()
{

    Handlebars.registerHelper('idfilter',function(link){
        var temp=link.replace(/\s/g, '');
        var temp1=temp.replace(/\|/g,"");
        return temp1;


    });
}
function checkconditionhelper()
{
    Handlebars.registerHelper('checkcondition',function(context,options){

        var ret='';
        var ch='';
        var descrip=context.split('|').reverse();
        var descname="";
        var str='';

        for(var i=0;i<descrip.length-1;i++)
        {
            if(temp[i]==descrip[i]){   str='';}

            else
            {
                descname=descrip[i];


                //  console.log(descrip[0]+""+descrip[1]);

                if(options.data.first&&descrip.length>2)
                {

                    ch='';


                }
if(temp.length<descrip.length)
{
  if(!options.data.first)
  {
      for(var i=0;i<(descrip.length-temp.length);i++)
      {
          ch=ch+'<ul><li>';

      }
  }
}
else if(temp.length>=descrip.length)
{
   // var oul="</ul>";
   // var temp12='';
    for(var i=0;i<=(temp.length-descrip.length);i++)
    {
        ch='</li></ul></li></ul>'+ch;
    }
   // ch=oul+temp12;
    ch=ch+'<ul><li>';
}
else
{

}

                var temp1=descrip.slice(i);
                console.log(temp1);





                if(descrip.length>2&&temp1.length>2)
                {
                    if(temp[0]!=descrip[0])
                    {

                        ch='';
                        str+=ch+'<a href="#" id="toggleElement'+options.data.index+'-1" class="mainToggle" style="vertical-align: bottom;display: inline;"><h3 style="display: inline"> - '+descrip[0];
                        str+= '</h3></a><ul><li>';
                        descname=descrip[i+1];
                    }





                }


                temp=descrip.slice(0);


                // console.log("Li Tag- "+options.data.index+" "+litag+" cls is "+ch);
                str+=ch+'<a href="#" id="toggleElement'+options.data.index+'" class="toggleElement" style="vertical-align: bottom;display: inline;"><h3 style="display: inline"> - '+descname;
                str+= '</h3></a><ul><li><table id="tabletoggleElement'+options.data.index+'" cellspacing="5" cellpadding="10">';
                str+= ' <tr style="width: 100%">';
                str+= '  <th style="width: 5%">S.No</th>';
                str+= '   <th style="width: 40%">';
                str+= '  Description';
                str+= '   </th>';
                str+= '    <th style="width: 10%">Result</th>';
                str+= '  <th style="width: 13%">Operating System</th>';
                str+= '   <th style="width: 12%">Browser</th>';
                str+='  <th style="width: 12%">Version</th>';
                str+= '  <th style="width: 18%">Screenshot</th>';

                str+= '  </tr></table></li>';

                break;
            }

        }
        return new Handlebars.SafeString(str );

        /* for(var i=0, j=1; i<context.length; i++,j++) {
         if (j != context.length ) {
         if (options.fn(context[i]) == options.fn(context[j])) {
         ret=options.fn(context[i]);
         } else {

         console.log(options.hash);
         ret += '<table cellspacing="5" cellpadding="10">';
         ret += ' <tr>';
         ret += '  <th>S.No</th>';
         ret += '   <th>';
         ret += '  Description';
         ret += '   </th>';
         ret += '    <th>Result</th>';
         ret += '  <th>Operating System</th>';
         ret += '   <th>Browser Name</th>';
         ret += '  <th>Browser Version</th>';
         ret += '  <th>Screenshot</th>';

         ret += '  </tr>';
         ret += options.fn(context[i]);

         }


         }
         if(j == context.length)
         {
         console.log("Kumar");

         ret += '<table cellspacing="5" cellpadding="10">';
         ret += ' <tr>';
         ret += '  <th>S.No</th>';
         ret += '   <th>';
         ret += '  Description';
         ret += '   </th>';
         ret += '    <th>Result</th>';
         ret += '  <th>Operating System</th>';
         ret += '   <th>Browser Name</th>';
         ret += '  <th>Browser Version</th>';
         ret += '  <th>Screenshot</th>';

         ret += '  </tr>';
         ret += options.fn(context[i]);
         }
         console.log(options.fn(context[i]));
         }*/

        // return ret;

    })

}

function endtaghelper()
{
    Handlebars.registerHelper('endtag',function(context,options) {


        if(options.data.last)
        {

            return new Handlebars.SafeString('</li></ul>');
        }
        else{


        }

    })
}


function listhelper()
{

}


module.exports={

 createhtml: createhtml



 }