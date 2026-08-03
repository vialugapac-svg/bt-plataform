export async function gerarRelatorioWorkshop() {
    const btn=document.getElementById('btnRelatorio');
 btn.disabled=true;
 btn.innerText='Gerando PDF...';
 const {jsPDF}=window.jspdf;
 const pdf=new jsPDF('p','mm','a4');
 pdf.setFontSize(22);
 pdf.text('BT Model Cristocêntrico',20,20);
 pdf.setFontSize(15);
 pdf.text('Relatório Executivo do Workshop',20,30);
 pdf.setFontSize(11);
 pdf.text('Data: '+new Date().toLocaleString('pt-BR'),20,40);
 pdf.addPage();
 pdf.setFontSize(18);
 pdf.text('Resumo Executivo',20,20);
 const cards=[...document.querySelectorAll('.resumo-card')];
 let y=35;
 cards.forEach(c=>{
   const n=c.querySelector('.resumo-num')?.innerText||'';
   const l=c.querySelector('.resumo-label')?.innerText||'';
   pdf.setFontSize(12);
   pdf.text(l+': '+n,20,y);
   y+=10;
 });
 pdf.addPage();
 const canvas=await html2canvas(document.getElementById('conteudo'),{scale:2,backgroundColor:'#0f1523'});
 const img=canvas.toDataURL('image/png');
 const pw=190;
 const ph=canvas.height*pw/canvas.width;
 pdf.addImage(img,'PNG',10,10,pw,ph);
 pdf.save('Relatorio_BT_Model.pdf');
 btn.disabled=false;
 btn.innerText='📄 Gerar Relatório Executivo';
}
