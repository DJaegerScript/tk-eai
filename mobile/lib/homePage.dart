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
          color: Colors.white
        ),
        title: const Text(
          "EAI Job Scrapper",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Color.fromARGB(255, 47, 156, 228),
      ),
      body: Column(
        children: [
          const Padding(
            padding: EdgeInsets.only(top:20, left:20, right:20),
            child:  Text(
                "Pilih Jenis Pekerjaan",
                style: TextStyle(
                  color: Color.fromARGB(255, 47, 156, 228),
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
                      color: Color.fromARGB(255, 47, 156, 228),
                      child: Column(
                        children: [
                          const Text(
                            "Programmer",
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                          ),
                          Image.network(
                            "https://cdn-icons-png.flaticon.com/512/5024/5024509.png",
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
                      color: Color.fromARGB(255, 47, 156, 228),
                      child: Column(
                        children: [
                          const Text(
                            "Data",
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                          ),
                          Image.network(
                            "https://cdn-icons-png.flaticon.com/512/4824/4824797.png",
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
                      color: Color.fromARGB(255, 47, 156, 228),
                      child: Column(
                        children: [
                          const Text(
                            "Cyber Security",
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                          ),
                          Image.network(
                            "https://cdn-icons-png.flaticon.com/512/8522/8522214.png",
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
                      color: Color.fromARGB(255, 47, 156, 228),
                      child: Column(
                        children: [
                          const Text(
                            "Network",
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
                          ),
                          Image.network(
                            "https://cdn-icons-png.freepik.com/512/2758/2758737.png",
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
    );
  } 
}