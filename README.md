( English description below     )
( Project Name: Sudoku Solver   )


# NE YAPAR ?                                
Her Sudoku problemini çözebilir. Wikipedia'dan "The Hardest Sudoku Puzzle" yüklenmiştir.
Problem hatalıysa konsola yazar. 

![Alt Text](images/EK1.jpg?raw=true "EkranKesiti")

![Alt Text](images/EK2.jpg?raw=true "EkranKesiti")


## Etkileşim
Kendi istediğiniz bir problemde test etmek isterseniz:

  /src/1kur.js - 16.satır :

  	soru= [  
		[8, 0, 0, 	0, 0, 0, 	0, 0, 0],
		[0, 0, 3, 	6, 0, 0, 	0, 0, 0],
		[0, 7, 0, 	0, 9, 0, 	2, 0, 0],
		
		[0, 5, 0, 	0, 0, 7, 	0, 0, 0],
		[0, 0, 0, 	0, 4, 5, 	7, 0, 0],
		[0, 0, 0, 	1, 0, 0, 	0, 3, 0],
		
		[0, 0, 1, 	0, 0, 0, 	0, 6, 8],
		[0, 0, 8, 	5, 0, 0, 	0, 1, 0],
		[0, 9, 0, 	0, 0, 0, 	4, 0, 0] 
	]

## Harezmik Yöntem

Çözebildiği kadarını eliminasyon()
Çözemediğini atmasyon() ile lakin
SDFS (Standart Depth First Search)
DFS'e en az ihtimalin olduğu kareden çatallanır.

Dinamik Programlama ve A-Star ile de çözmeye çalıştım.
Lakin başarı elde edemedim. Kodları 5astar.js'de bulabilir geliştirebilirsiniz.



# WHAT FOR ?
Solves any sudoku puzzle.
Default problem is "The Hardest Sudoku Puzzle" from Wikipedia.

![Alt Text](images/EK1.jpg?raw=true "EkranKesiti")

![Alt Text](images/EK2.jpg?raw=true "EkranKesiti")


## Interaction
If you wish to test it on any other problem, you need to dive in the code :

  /src/1kur.js - 16.line :

  	soru= [  
		[8, 0, 0, 	0, 0, 0, 	0, 0, 0],
		[0, 0, 3, 	6, 0, 0, 	0, 0, 0],
		[0, 7, 0, 	0, 9, 0, 	2, 0, 0],
		
		[0, 5, 0, 	0, 0, 7, 	0, 0, 0],
		[0, 0, 0, 	0, 4, 5, 	7, 0, 0],
		[0, 0, 0, 	1, 0, 0, 	0, 3, 0],
		
		[0, 0, 1, 	0, 0, 0, 	0, 6, 8],
		[0, 0, 8, 	5, 0, 0, 	0, 1, 0],
		[0, 9, 0, 	0, 0, 0, 	4, 0, 0] 
	]


## Algorithm :

1. finds if only one probable number the square can take, if success marks that number for square.
2. examines vertical, horizontal and bubble for all 1..9 numbers, if only one square is eligible marks that square
3. if step-1 and step-2 (elimination methods) are out of progression, it is time to make guesses. starting from the squares which has minimum number of possibilities, applying DFS and Backtracking.
4. tried to implement A-Star method and dynamic programming but results were buggy and not good enough. if you want to inspect the code and make it real 5aStar.js is the intended code.