let soru; let çözümSDFS; let havuzSDFS; let yığıtSDFS= []; 
let çözümKFS; let havuzKFS; let yığıtKFS= []; 
let abort1= false; let abort2= false; let tekrarLimit=5000
let falsoTahminler=[]; let mevcutTahminler=[]

const kaçlı = 9		// 4-9-16 klasik sudoku
const kutueni = 35 	// piksel 4:55  9:35  25:??

function setup() {    // AÇILIŞ EKRANI 
	createCanvas(innerWidth-30, innerHeight-40);
	colorMode(HSB);
	frameRate(30);            
	textSize(2/3*kutueni);	
	textAlign(CENTER);
	
	soru= [  //  EN ZOR SUDOKU
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
	
	// soru= [  //  SAÇMA SUDOKU
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
		
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 5, 6, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
		
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 0, 0],
	// ]

	// soru= [  //  KOLAY SUDOKU
	// 	[7, 0, 2, 	0, 0, 0, 	6, 0, 0],
	// 	[0, 0, 0, 	0, 0, 0, 	0, 2, 0],
	// 	[0, 1, 0, 	2, 0, 8, 	0, 3, 0],
		
	// 	[0, 4, 0, 	6, 0, 0, 	0, 8, 0],
	// 	[8, 2, 7, 	0, 0, 0, 	0, 0, 6],
	// 	[0, 0, 6, 	0, 8, 2, 	3, 0, 0],
		
	// 	[5, 0, 0, 	0, 6, 1, 	2, 0, 0],
	// 	[9, 0, 0, 	0, 0, 0, 	0, 5, 3],
	// 	[0, 7, 0, 	0, 5, 0, 	9, 0, 0] 
	// ]
	
	// soru= [  //  2X2 SUDOKU
	// 	[1, 0,   2, 4],
	// 	[0, 0, 	 0, 0],
		
	// 	[0, 1,   0, 0],
	// 	[0, 0,   0, 0],
	// ]
	
	
	çözümSDFS = kopi(soru)
	çözümKFS = kopi(soru)
	havuzlarıKur()
	
	SDFS()
	// SDFS2()
}

function sleep(ms=1) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function kopi(anam) {
	return JSON.parse(JSON.stringify(anam))
}