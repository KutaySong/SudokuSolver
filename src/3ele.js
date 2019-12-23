
async function yineliEliminasyon (hangıHavuz, hangıÇözüm) {
    let ilerleme = 0
    let sonuç = 1
    while (sonuç>0) {          
        sonuç = eliminasyon(hangıHavuz, hangıÇözüm);
        if (sonuç) ilerleme++
        await sleep()
    }
    if (sonuç == -1) return -1
    else return ilerleme
}


function eliminasyon(hangıHavuz,hangıÇözüm) {  // tek tur bul ve havuzları temizle
    let sayımYatay= [] 
    let sayımDikey= []
    let sayımKutu = []
    for(let n=0; n<kaçlı; n++) {        
        sayımYatay[n]=Array(kaçlı).fill(0)
        sayımDikey[n]=Array(kaçlı).fill(0)
        sayımKutu[n]=Array(kaçlı).fill(0)
    }
    
    for(let i=0; i<kaçlı; i++) {        // ihtimali tek kalanlar
        for(let j=0; j<kaçlı; j++) {       
            let k= floor(i/sqrt(kaçlı)) + sqrt(kaçlı) * floor(j/sqrt(kaçlı))
            if (!hangıÇözüm[i][j]) {    // çözüm daha önce bulunamamışsa
                
                if (hangıHavuz[i][j].length==1) {
                    hangıÇözüm[i][j]=hangıHavuz[i][j][0]
                    havuzTemizle(hangıHavuz,i,j,hangıÇözüm[i][j])
                    return hangıÇözüm[i][j]  // bulunan rakam 1,2,3 .. 9
                } 
                else if (hangıHavuz[i][j].length== 0)
                return -1  //  ERROR: çakışma
                else {
                    for ( let n of hangıHavuz[i][j] ) {     // tek "5" ihtimali bende mi?
                    n = n-1
                    if (!sayımYatay[i][n]) sayımYatay[i][n]= i+j*kaçlı+1
                    else if (sayımYatay[i][n]!=-1) sayımYatay[i][n]= -1             
                    if (!sayımDikey[j][n]) sayımDikey[j][n]= i+j*kaçlı+1
                    else if (sayımDikey[j][n]!=-1) sayımDikey[j][n]= -1
                    if (!sayımKutu[k][n]) sayımKutu[k][n]= i+j*kaçlı+1
                    else if (sayımKutu[k][n]!=-1) sayımKutu[k][n]= -1
                }
            }
        }
    }
}
for(let i=0; i<kaçlı; i++) {        // grubunda tek ihtimali olanlar
    for(let n=0; n<kaçlı; n++) {
        if (sayımYatay[i][n] && sayımYatay[i][n]!=-1) {
            let ix = (sayımYatay[i][n]-1)%kaçlı
            let jx = floor((sayımYatay[i][n]-1)/kaçlı)
            hangıÇözüm[ix][jx]=n+1
            havuzTemizle(hangıHavuz,ix,jx,hangıÇözüm[ix][jx])
            return hangıÇözüm[ix][jx]
        }
        if (sayımDikey[i][n] && sayımDikey[i][n]!=-1) {
            let ix = (sayımDikey[i][n]-1)%kaçlı
            let jx = floor((sayımDikey[i][n]-1)/kaçlı)
            hangıÇözüm[ix][jx]=n+1
            havuzTemizle(hangıHavuz,ix,jx,hangıÇözüm[ix][jx])
            return hangıÇözüm[ix][jx]
        }
        if (sayımKutu[i][n] && sayımKutu[i][n]!=-1) {
            let ix = (sayımKutu[i][n]-1)%kaçlı
            let jx = floor((sayımKutu[i][n]-1)/kaçlı)      
            hangıÇözüm[ix][jx]=n+1
            havuzTemizle(hangıHavuz,ix,jx,hangıÇözüm[ix][jx])
            return hangıÇözüm[ix][jx]
        }
    }
}
return 0  // bulunamadı
}



function havuzTemizle(hangısı,i,j,numero) {
    hangısı[i][j]= []
    dikeyTemizle(hangısı,j,numero)
    yatayTemizle(hangısı,i,numero)
    kutuTemizle(hangısı,i,j,numero)
}
function dikeyTemizle(hangısı,j,numero) {
    for(let x=0; x<kaçlı; x++) {
        if (hangısı[x][j].length) {
            let yeri = hangısı[x][j].indexOf(numero)
            if (yeri !== -1) hangısı[x][j].splice(yeri,1)
            // if (!hangısı[x][j].length) console.error("Bozuk Sudoku !!")
        }
    }
}
function yatayTemizle(hangısı,i,numero) {
    for(let y=0; y<kaçlı; y++) {
        if (hangısı[i][y].length) {
            let yeri = hangısı[i][y].indexOf(numero)
            if (yeri !== -1) hangısı[i][y].splice(yeri,1)
            // if (!hangısı[i][y].length) console.error("Bozuk Sudoku !!")
        }
    }
}
function kutuTemizle(hangısı,i,j,numero) {
    let kutuX= floor(i/sqrt(kaçlı))
    let kutuY= floor(j/sqrt(kaçlı))
    
    for(let i=kutuX*sqrt(kaçlı); i<(kutuX+1)*sqrt(kaçlı); i++) {
        for(let j=kutuY*sqrt(kaçlı); j<(kutuY+1)*sqrt(kaçlı); j++) {
            if (hangısı[i][j].length) {
                let yeri = hangısı[i][j].indexOf(numero)
                if (yeri !== -1) hangısı[i][j].splice(yeri,1)
                // if (!hangısı[i][j].length) console.error("Bozuk Sudoku !!")
            }
        }
    }
}


function havuzlarıKur () {  // ilk kurulum
    //  boş yarat
    havuzSDFS = []
    for(let i=0; i<kaçlı; i++) {
        havuzSDFS[i] = []
        for(let j=0; j<kaçlı; j++) {
            havuzSDFS[i][j] = []
            for(let n=1; n<=kaçlı; n++) {
                havuzSDFS[i][j].push(n)
            }
        }
    }
    // sorudakileri ele
    for(let i=0; i<kaçlı; i++) {
        for(let j=0; j<kaçlı; j++) {
            if (soru[i][j]) {
                havuzTemizle(havuzSDFS,i,j,soru[i][j])
            }
        }
    }
    
    havuzKFS = kopi(havuzSDFS)
}


function kaçKaldı (hangıÇözüm) {
    let sıfırSayısı=0
    for (let i=0; i<hangıÇözüm.length; i++) {
        for (let j=0; j<hangıÇözüm[i].length; j++) {
            if (!hangıÇözüm[i][j]) sıfırSayısı++
        }
    }
    return sıfırSayısı
}