"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const querystring = require('querystring');
http_1.default
    .createServer((request, response) => {
    const headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Content-Type': 'text/html',
    };
    if (request.url?.startsWith('/api/sums')) {
        if (request.method == 'GET') {
            response.writeHead(200, headers);
            var queryStartIndex = request.url.indexOf('?') + 1;
            //let nums: INums = querystring.parse(request.url.substring(queryStartIndex));
            let params = new URLSearchParams(request.url.substring(queryStartIndex));
            if (params != null) {
                if ((params.get('num1') == null || isNaN(+params.get('num1'))) && (params.get('num2') == null || isNaN(+params.get('num2')))) {
                    response.end('Both numbers submitted are not numbers or are using invalid format!');
                }
                else if (params.get('num1') == null || isNaN(+params.get('num1'))) {
                    response.end('First number submitted is not a number or is using invalid format!');
                }
                else if (params.get('num2') == null || isNaN(+params.get('num2'))) {
                    response.end('Second number submitted is not a number or is using invalid format!');
                }
                else {
                    let nums2 = { num1: +params.get('num1'), num2: +params.get('num2') };
                    console.log(nums2);
                    response.end((nums2.num1 + nums2.num2).toString());
                }
            }
            else {
                response.end('Query string is using invalid format!');
            }
            // console.log(nums);
            // //var seperatorIndex = request.url.indexOf('&');
            // //let num1 = +request.url.substring(queryStartIndex,seperatorIndex);
            // //let num2 = +request.url.substring(seperatorIndex+1);
            // if((isNaN(nums.num1) || nums.num1 == null) && (isNaN(nums.num2) || nums.num2 == null)){
            //     response.end('Both numbers submitted are not numbers or are using invalid format!');
            // }else if(isNaN(nums.num1) || nums.num1 == null){
            //     response.end('First number submitted is not a number or using invalid format!');
            // }else if(isNaN(nums.num2) || nums.num2 == null){
            //     response.end('Second number submitted is not a number or using invalid format!');
            // }else{
            //     response.end(( +nums.num1 + +nums.num2 ).toString());
            // }
            // }else if(request.method == 'POST'){
            //     var body ="";
            //     request.on("data", function(chunk){
            //         body += chunk;
            //     });
            //     console.log("here's the body " + body);
            //     let nums: INums = querystring.decode(body);
            //     console.log("here's the nums " + nums);
            //     response.writeHead(200, headers);
            //     if((isNaN(nums.num1) || nums.num1 == null) && (isNaN(nums.num2) || nums.num2 == null)){
            //         response.end('Both numbers submitted are not numbers or are using invalid format!');
            //     }else if(isNaN(nums.num1) || nums.num1 == null){
            //         response.end('First number submitted is not a number or using invalid format!');
            //     }else if(isNaN(nums.num2) || nums.num2 == null){
            //         response.end('Second number submitted is not a number or using invalid format!');
            //     }else{
            //         response.end(( +nums.num1 + +nums.num2 ).toString());
            //     }
        }
        else if (request.method == "OPTIONS") {
            console.log("options called!");
            response.writeHead(204, headers);
            response.end();
        }
    }
    else {
        response.statusCode = 404;
        response.end('Invalid Request!');
    }
})
    .listen(9898, () => console.log("Server started."));
