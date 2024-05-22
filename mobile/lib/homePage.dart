import 'package:flutter/material.dart';
import 'package:job_scrapper/searchJobsPage.dart';


class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
	@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(
          color: Colors.black
        ),
        title: const Text(
          "EAI Job Scrapper",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [
              Color.fromRGBO(148, 35, 206, 1),
              Color.fromRGBO(96, 164, 250, 1),
            ],
          )
        ),
        child: Column(
          children: [
            const Padding(
              padding: EdgeInsets.only(top:20, left:20, right:20),
              child:  Text(
                  "Pilih Jenis Pekerjaan",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.bold
                  ),
                ),
            ),
            
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(left:20, top:20),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context, 
                          MaterialPageRoute(builder: (context) => const SearchJobsPage(jobTypeFilter: "Programmer"))
                        );
                      },
                      child: Card(
                        color: Colors.black,
                        child: Column(
                          children: [
                            const Text(
                              "Programmer",
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                            ),
                            Image.network(
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi2BifygWQbxa7P0_cjyXJ3mblLhWvt_1gw2_Vfwu1WmhXiUIF",
                              fit: BoxFit.cover,
                              height: 100,
                              width: 100
                            )
                          ],
                        ),
                      ),
                    )
                  ),

                  Padding(
                    padding: EdgeInsets.only(right:20, top:20),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context, 
                          MaterialPageRoute(builder: (context) => const SearchJobsPage(jobTypeFilter: "Data"))
                        );
                      },
                      child: Card(
                        color: Colors.black,
                        child: Column(
                          children: [
                            const Text(
                              "Data",
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                            ),
                            Image.network(
                              "https://biztechacademy.id/wp-content/uploads/2022/03/1-1.jpg",
                              fit: BoxFit.cover,
                              height: 100,
                              width: 100
                            )
                          ],
                        ),
                      ),
                    )
                  ),

                  Padding(
                    padding: EdgeInsets.only(left:20, bottom:20),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context, 
                          MaterialPageRoute(builder: (context) => const SearchJobsPage(jobTypeFilter: "Cyber Security"))
                        );
                      },
                      child: Card(
                        color: Colors.black,
                        child: Column(
                          children: [
                            const Text(
                              "Cyber Security",
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                            ),
                            Image.network(
                              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSzjMNVV9vFKrdThvElwtP5sOJAiGBJ_DVFsvgfe-e7V4bF5-oJ",
                              fit: BoxFit.cover,
                              height: 100,
                              width: 100
                            )
                          ],
                        ),
                      ),
                    )
                  ),

                  Padding(
                    padding: EdgeInsets.only(right:20, bottom:20),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context, 
                          MaterialPageRoute(builder: (context) => const SearchJobsPage(jobTypeFilter: "Network"))
                        );
                      },
                      child: Card(
                        color: Colors.black,
                        child: Column(
                          children: [
                            const Text(
                              "Network",
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                            ),
                            Image.network(
                              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQKreymK4MMqC1Gri7YY0UE1j0GrTnGYky-fQGlfWynrQmwr51",
                              fit: BoxFit.cover,
                              height: 100,
                              width: 100
                            )
                          ],
                        ),
                      ),
                    )
                  ),
                ]
              )
            )
          ],
        )
      )
    );
  } 
}