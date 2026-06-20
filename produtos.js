/* ============================================================================
   CRUELLA — produtos.js
   ▼▼▼  É AQUI QUE EDITAS A LOJA. É o único ficheiro que precisas de mexer.  ▼▼▼
   (As alterações aparecem automaticamente na Home e na página Shop.)

   ADICIONAR ARTIGO:  copia um bloco { ... }, cola dentro de ARTIGOS, edita.
   FOTOS:             põe os ficheiros na pasta  fotos/  no GitHub e aponta
                      o campo "photos" para eles. 1 ou mais por artigo.
   REMOVER:           apaga o bloco { ... } todo.
   VENDIDO:           muda  sold: false  ->  sold: true

   CAMPOS:
     category     "footwear" | "clothing"
     subcategory  footwear -> Boots · Heels · Kitten Heels · Ballet Flats ·
                              Mules · Platforms · Loafers · Sandals · Sneakers
                  clothing -> Jackets & Coats · Tops · Dresses · Skirts ·
                              Trousers · Denim
     brand        Miu Miu · Prada · Gucci · Diesel · Miss Sixty · Vintage under €30
     price        número em euros (ex: 95) -> mostrado como  €95

   PAGAMENTOS (opcional, podes adicionar mais tarde):
     buyLink   -> se puseres um link de pagamento da Stripe aqui, o botão da
                  peça passa a "Buy now" e leva o cliente direto ao pagamento.
                  Se deixares vazio "", o botão fica "Reserve" (vai ao Contact).
                  (Explicação completa no README.)
   ============================================================================ */

const ARTIGOS = [
  {
    ref: "0003",
    category: "footwear",
    subcategory: "Heels",
    name: "Cream leather Mary Jane heels",
    brand: "Miu Miu",
    size: "EU 38",
    price: 120,
    condition: "Great vintage condition",
    description: "Soft off-white leather Mary Janes with a rounded square toe and a stacked wooden block heel. Single buckle strap. Comes with the original box.",
    photos: ["fotos/0001_1.jpg", "fotos/0001_2.jpg"],
    buyLink: "",          // <- cola aqui o link de pagamento da Stripe quando quiseres
    sold: false,
  },
  {
    ref: "0002",
    category: "footwear",
    subcategory: "Boots",
    name: "Burgundy patchwork ankle boots",
    brand: "Miss Sixty",
    size: "EU 39",
    price: 85,
    condition: "Good vintage condition",
    description: "Deep burgundy ankle boots in mixed leather and patent panels with contrast topstitching in a windowpane grid. Low curved heel, side zip.",
    photos: ["fotos/0002_1.jpg"],
    sold: false,
  },
  {
    ref: "0001",
    category: "footwear",
    subcategory: "Platforms",
    name: "Brown leather peep-toe platform mules",
    brand: "Gucci",
    size: "EU 38",
    price: 110,
    condition: "Good vintage condition — light wear",
    description: "Rich brown leather peep-toe mules on a tall wedge with a studded brass-tone edge. Heavy, handmade feel with a worn-in patina.",
    photos: ["fotos/0003_1.jpg"],
    sold: false,
  },
  {
    ref: "0004",
    category: "footwear",
    subcategory: "Platforms",
    name: "Floral embroidered denim clogs",
    brand: "Prada",
    size: "EU 37",
    price: 95,
    condition: "Great vintage condition",
    description: "Blue denim peep-toe platform clogs covered in colourful hand-embroidered flowers on a pale wooden wedge. A true one-off.",
    photos: ["fotos/0004_1.jpg", "fotos/0004_2.jpg"],
    sold: false,
  },
  {
    ref: "0005",
    category: "footwear",
    subcategory: "Sandals",
    name: "Denim wooden geta platform sandals",
    brand: "Vintage under €30",
    size: "EU 38",
    price: 28,
    condition: "Good vintage condition",
    description: "Sculpted wooden platform thong sandals with a frayed raw-denim strap. Bold 90s/Y2K silhouette, surprisingly comfortable.",
    photos: ["fotos/0005_1.jpg", "fotos/0005_2.jpg"],
    sold: false,
  },
  {
    ref: "0006",
    category: "footwear",
    subcategory: "Boots",
    name: "Black lace-up tech boots",
    brand: "Diesel",
    size: "EU 41",
    price: 65,
    condition: "Good vintage condition",
    description: "Black leather and technical-fabric lace-up ankle boots with a squared toe and a slim sole. Archive sport-luxe energy.",
    photos: ["fotos/0006_1.jpg", "fotos/0006_2.jpg"],
    sold: true,
  },
];

