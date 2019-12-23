

async function SDFS() {
    if(tekrarLimit--<0) return
    
    let kalan= kaçKaldı(çözümSDFS)
    let sonuç= await yineliEliminasyon(havuzSDFS,çözümSDFS)
    
    if (sonuç==kalan) {
        console.log("Baştan arayarak çözdüm."); abort1=true;
    } else if (abort1) {
        return 1
    } else if (sonuç>=0) {
        let [i, j, n] = enOlasıBul(havuzSDFS)
        havuzSDFS[i][j].splice(0,1)                             // havuzdan at
        yığıtSDFS.push([kopi(çözümSDFS), kopi(havuzSDFS)])      // yığıta yaz
        çözümSDFS[i][j]=n                                       // çözüme yaz
        havuzTemizle(havuzSDFS, i, j, n)                        // havuzu ayarla
        // await sleep()
        SDFS()
    } else if (sonuç==-1) {
        
        try { [çözümSDFS, havuzSDFS ] = yığıtSDFS.pop() }
        catch (error) {console.error("Bozuk Sudoku !!")}
        // await sleep()
        SDFS()
    }
}


function enOlasıBul (hangıHavuz) { // 2 ve büyük, minimumu döner [i,j,4]
    let ix ; let jx
    let enminiğindeğeri=kaçlı+1
    for(let i=0; i<kaçlı; i++) {
        for(let j=0; j<kaçlı; j++) {
            if (hangıHavuz[i][j].length && hangıHavuz[i][j].length<enminiğindeğeri) {
                enminiğindeğeri = hangıHavuz[i][j].length
                ix=i ; jx=j
            }
            if (enminiğindeğeri==1) break;
        }
        if (enminiğindeğeri==1) break;
    }
    if (enminiğindeğeri==kaçlı+1) return -1
    // console.log("en olası:", ix, jx, hangıHavuz[ix][jx][0])
    return [ix, jx, hangıHavuz[ix][jx][0]]
}

function çözümlemeBittiMi (hangıÇözüm) {     // true false
    return hangıÇözüm.every(satır => satır.reduce((t,n)=> t= n ? t : false ,true ) )
}