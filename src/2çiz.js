

function draw() {
	background(0);
	
	çizSDFS();
	çizKFS();
}

function dur() { abort1=true; abort2=true }

function logla() {
	if (abort1 && abort2) {clearInterval()}
	else {
		console.log("SDFS tahmin üstüne tahmin:", yığıtSDFS.length)
		console.log("KDFS tahmin üstüne tahmin:", yığıtKFS.length)
	}
}

function çizSDFS () {	// sol tarafa  X=50 Y=100
	
	//  başlık
	
	noStroke(); fill("green")
	textSize(kutueni);	
	text("Çözüm (Solution)",220,70)
	textSize(2/3*kutueni);	
	
	// çizgiler
	
	for (i=0; i<kaçlı-1; i++) {
		if (i%sqrt(kaçlı)==sqrt(kaçlı)-1) {
			stroke('white');
			strokeWeight(4);
		} else {
			stroke('gray');
			strokeWeight(3);			
		}
		line(50+kutueni+i*kutueni,100, 50+kutueni+i*kutueni,100+kaçlı*kutueni)  // dikey çızgılar
	}
	
	for (i=0; i<kaçlı-1; i++) {
		if (i%sqrt(kaçlı)==sqrt(kaçlı)-1) {
			stroke('white');
			strokeWeight(4);
		} else {
			stroke('gray');
			strokeWeight(3);			
		}
		line(50,100+kutueni+i*kutueni, 50+kaçlı*kutueni,100+kutueni+i*kutueni)  // yatay çızgılar
	}
	
	//  rakamlar
	noStroke()
	fill("white")
	for (i=0; i<kaçlı; i++) {
		for (j=0; j<kaçlı; j++) {
			if (çözümSDFS[i][j]) {

				if (soru[i][j]) fill("white")
				else if (yığıtSDFS.length) fill("yellow")
				else fill("green")
				text(çözümSDFS[i][j], 50+kutueni/2+ j*kutueni, 100+ 4/5*kutueni+ i*kutueni)
			}
		}
	}
}


function çizKFS () {	// sağ tarafa  X=50 Y=Height/2 + 100
	
	//  başlık
	
	noStroke(); fill("blue")
	textSize(kutueni);	
	text("Hardest Sudoku Puzzle",220, height/2+50)
	textSize(2/3*kutueni);	
	
	// çizgiler
	
	for (i=0; i<kaçlı-1; i++) {
		if (i%sqrt(kaçlı)==sqrt(kaçlı)-1) {
			stroke('white');
			strokeWeight(4);
		} else {
			stroke('gray');
			strokeWeight(3);			
		}
		line(50+kutueni+i*kutueni,height/2+100, 50+kutueni+i*kutueni,height/2+100+kaçlı*kutueni)  // dikey çızgılar
	}
	
	for (i=0; i<kaçlı-1; i++) {
		if (i%sqrt(kaçlı)==sqrt(kaçlı)-1) {
			stroke('white');
			strokeWeight(4);
		} else {
			stroke('gray');
			strokeWeight(3);			
		}
		line(50,height/2+100+kutueni+i*kutueni, 50+kaçlı*kutueni,height/2+100+kutueni+i*kutueni)  // yatay çızgılar
	}
	
	//  rakamlar
	noStroke()
	fill("white")
	for (i=0; i<kaçlı; i++) {
		for (j=0; j<kaçlı; j++) {
			if (çözümKFS[i][j]) {
				if (soru[i][j]) fill("white")
				else if (yığıtKFS.length>1) fill("orange")
				else fill("blue")
				text(çözümKFS[i][j], 50+kutueni/2+ j*kutueni, height/2+100+ 4/5*kutueni+ i*kutueni)
			}
		}
	}
	
}