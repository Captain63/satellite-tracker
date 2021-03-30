# satellite-tracker

## Live Application:
https://captain63.github.io/satellite-tracker/

Main content about app will be here...
<br><br><br><br><br><br><br><br><br><br>



<br>
<hr>

## APIs
<br>

### __Sattelite tracker__ &nbsp; 
[documentation link...]('https://www.n2yo.com/api/#above')
<br>
<br>
Base URL : https://api.n2yo.com/rest/v1/satellite/
<br><br>
To get all sattelites above me
<br>
Request :
/above/{observer_lat}/{observer_lng}/{observer_alt}/{search_radius}/{category_id}
<br><br>

![parameters list with description](./assets/images/sattelite-tracker-requestParams.png)
<br><br>

Example :
<br>
https://api.n2yo.com/rest/v1/satellite/above/38.846226/-77.306374/0/20/30/&apiKey=V9D6C3-2PPF46-6G6N28-5KZ0
<br><br>

Response :
<br><br>
![response body image](./assets/images/sattelite-tracker-responseBody-2.png)

<br><br>
