const WHATSAPP='5532999078885';
const imgs={
  frango:'https://img0.didiglobal.com/static/soda_public/img_2a811c30f46ddd2daf17f5f9b0066f8e.png',
  misto:'https://storage.alfalabs.com.br/assets/imgClientes/promocoes/id-773/2026-02-26_16-38-19.png',
  catupiry:'https://s3.us-west-2.amazonaws.com/whatsmenu/production/teldopastel/products/511025/timages%20%2821%29.jpeg',
  cana:'https://3.bp.blogspot.com/-afzLxLk2DYI/TpL5yldXNlI/AAAAAAAASrU/pNrNV71gN_Q/s1600/Caldo.jpg',
  maracuja:'https://sabordachina.meucatalogofacil.com/_core/_uploads/2021/06/1637170621akeha5kj4k.jpeg'
};
const products=[
['carne','Pastel de Carne Moída','Carne moída bem temperada',10,'tradicionais',imgs.misto,'Tradicional'],
['queijo','Pastel de Queijo','Recheio de queijo',10,'tradicionais',imgs.catupiry,'Tradicional'],
['pizza','Pastel de Pizza','Sabor pizza',10,'tradicionais',imgs.misto,'Tradicional'],
['frango','Pastel de Frango','Frango desfiado',10,'tradicionais',imgs.frango,'Tradicional'],
['costela','Pastel de Costela','Costela desfiada',10,'tradicionais',imgs.misto,'Tradicional'],
['frango-catupiry','Frango c/ Catupiry','Frango desfiado com catupiry',12,'especiais',imgs.catupiry,'Especial'],
['frango-cheddar','Frango c/ Cheddar','Frango desfiado com cheddar',12,'especiais',imgs.catupiry,'Especial'],
['brasil','Pastel Brasil','Carne moída, vinagrete, bacon e milho',12,'especiais',imgs.misto,'Especial'],
['casa','Especial da Casa','Frango, presunto, mussarela, cheddar e milho',15,'especiais',imgs.frango,'Da casa'],
['costela-cheddar','Costela c/ Cheddar','Costela desfiada com cheddar',15,'especiais',imgs.misto,'Especial'],
['costela-catupiry','Costela c/ Catupiry','Costela desfiada com catupiry',15,'especiais',imgs.catupiry,'Especial'],
['explosao','Explosão Mineira','Presunto, mussarela, calabresa, bacon e milho',15,'especiais',imgs.misto,'Especial'],
['turbinado','Turbinado','Frango, bacon, calabresa, cheddar ou catupiry',15,'especiais',imgs.frango,'Especial'],
['supremo','Supremo','Frango, costela, carne moída, presunto, mussarela, calabresa, vinagrete, milho, azeitona, ovo, bacon, catupiry e cheddar',25,'especiais',imgs.misto,'Completo'],
['cana300','Caldo de cana 300ml','Natural, abacaxi, limão ou hortelã',5,'bebidas',imgs.cana,'300ml'],
['cana500','Caldo de cana 500ml','Natural, abacaxi, limão ou hortelã',7,'bebidas',imgs.cana,'500ml'],
['cana1l','Caldo de cana 1L','Natural, abacaxi, limão ou hortelã',10,'bebidas',imgs.cana,'1 litro'],
['agua','Água','Garrafa de água',3,'bebidas',imgs.cana,'Bebida'],
['aguagas','Água com gás','Garrafa de água com gás',4,'bebidas',imgs.cana,'Bebida'],
['refri200','Refrigerante 200ml','Escolha o sabor disponível',3,'bebidas',imgs.maracuja||imgs.misto, '200ml'],
['refri-lata','Refrigerante lata','Escolha o sabor disponível',7,'bebidas',imgs.misto,'Lata'],
['refri600','Refrigerante 600ml','Escolha o sabor disponível',9,'bebidas',imgs.misto,'600ml'],
['refri1l','Refrigerante 1L','Escolha o sabor disponível',12,'bebidas',imgs.misto,'1 litro'],
['maracuja500','Maracujá 500ml','Suco natural',8,'sucos',imgs.maracuja,'500ml'],
['maracuja1l','Maracujá 1L','Suco natural',14,'sucos',imgs.maracuja,'1 litro'],
['maracuja-leite500','Maracujá c/ leite 500ml','Suco cremoso',10,'sucos',imgs.maracuja,'Cremoso'],
['maracuja-leite1l','Maracujá c/ leite 1L','Suco cremoso',25,'sucos',imgs.maracuja,'Cremoso'],
['morango-leite500','Morango c/ leite 500ml','Suco cremoso',10,'sucos',imgs.maracuja,'Cremoso'],
['morango-leite1l','Morango c/ leite 1L','Suco cremoso',25,'sucos',imgs.maracuja,'Cremoso'],
['milho','Milho','Adicional',2,'adicionais',imgs.frango,'Adicional'],['vinagrete','Vinagrete','Adicional',2,'adicionais',imgs.frango,'Adicional'],['ovo-codorna','Ovo de codorna','Adicional',2,'adicionais',imgs.frango,'Adicional'],['azeitona','Azeitona','Adicional',2,'adicionais',imgs.frango,'Adicional'],['cheddar','Cheddar','Adicional',4,'adicionais',imgs.catupiry,'Adicional'],['catupiry','Catupiry','Adicional',4,'adicionais',imgs.catupiry,'Adicional']
].map(x=>({id:x[0],name:x[1],desc:x[2],price:x[3],cat:x[4],img:x[5],tag:x[6]}));
// Corrige possíveis nomes de imagem e mantém uma foto real por produto.
products.forEach(p=>{if(!p.img)p.img=imgs.misto});
let cart={};
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const grid=document.querySelector('#menuGrid');const toast=document.querySelector('#toast');
function renderMenu(filter='todos'){grid.innerHTML=products.filter(p=>filter==='todos'||p.cat===filter).map(p=>`<article class="menu-card"><div class="menu-photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span><span class="photo-note">Foto real • ilustrativa</span></div><div class="menu-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}">+ Adicionar</button></div></div></article>`).join('')}
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1800)}
function renderCart(){const el=document.querySelector('#cartItems'), entries=Object.entries(cart);if(!entries.length){el.innerHTML='<div class="empty">Seu carrinho está vazio.<br><a href="#cardapio">Escolher produtos ↑</a></div>';document.querySelector('#cartTotal').textContent=money(0);return}let total=0;el.innerHTML=entries.map(([id,q])=>{const p=products.find(x=>x.id===id),sub=p.price*q;total+=sub;return `<div class="cart-line"><div><b>${p.name}</b><small>${money(p.price)} cada</small></div><div class="qty"><button type="button" data-minus="${id}">−</button><b>${q}</b><button type="button" data-plus="${id}">+</button></div><button type="button" class="remove" data-remove="${id}">×</button></div>`}).join('');document.querySelector('#cartTotal').textContent=money(total)}
function change(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];renderCart()}
grid.addEventListener('click',e=>{if(e.target.dataset.add){change(e.target.dataset.add,1);showToast('Adicionado ao pedido ✓')}});
document.querySelector('#cartItems').addEventListener('click',e=>{if(e.target.dataset.plus)change(e.target.dataset.plus,1);if(e.target.dataset.minus)change(e.target.dataset.minus,-1);if(e.target.dataset.remove){delete cart[e.target.dataset.remove];renderCart()}});
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderMenu(t.dataset.filter)}));
const tipo=document.querySelector('#tipoPedido'), end=document.querySelector('#endereco'), ew=document.querySelector('#enderecoWrap'), rw=document.querySelector('#referenciaWrap');
tipo.addEventListener('change',()=>{const on=tipo.value==='entrega';ew.classList.toggle('hidden',!on);rw.classList.toggle('hidden',!on);end.required=on});
document.querySelector('#pagamento').addEventListener('change',e=>document.querySelector('#trocoWrap').classList.toggle('hidden',e.target.value!=='Dinheiro'));
document.querySelector('#orderForm').addEventListener('submit',e=>{e.preventDefault();if(!Object.keys(cart).length){showToast('Adicione pelo menos um produto');document.querySelector('#cardapio').scrollIntoView({behavior:'smooth'});return}const f=new FormData(e.currentTarget);let total=0;const lines=Object.entries(cart).map(([id,q])=>{const p=products.find(x=>x.id===id);total+=p.price*q;return `• ${q}x ${p.name} — ${money(p.price*q)}`});let msg=`Olá! Quero fazer um pedido na Pastelaria do Dedê. 🥟\n\n*DADOS DO CLIENTE*\nNome: ${f.get('nome')}\nWhatsApp: ${f.get('telefone')}\nTipo: ${f.get('tipoPedido')==='entrega'?'Entrega 🛵':'Retirada 🏪'}`;if(f.get('tipoPedido')==='entrega')msg+=`\nEndereço: ${f.get('endereco')}\nReferência: ${f.get('referencia')||'Não informada'}`;msg+=`\nPagamento: ${f.get('pagamento')}`;if(f.get('pagamento')==='Dinheiro'&&f.get('troco'))msg+=`\nTroco para: ${f.get('troco')}`;msg+=`\n\n*PEDIDO*\n${lines.join('\n')}\n\n*TOTAL: ${money(total)}*`;if(f.get('observacao'))msg+=`\n\nObservação: ${f.get('observacao')}`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank')});
renderMenu();renderCart();
