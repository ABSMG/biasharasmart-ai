
import { useMemo, useState } from "react";
import {
  LayoutDashboard, Users, Package, ShoppingCart, FileText,
  Sparkles, Menu, Plus, Search, TrendingUp, Boxes, X, Trash2
} from "lucide-react";

const initialProducts = [
  { id: 1, name: "Mchele wa kilo 1", category: "Chakula", price: 3000, stock: 25 },
  { id: 2, name: "Mafuta ya kupikia 1L", category: "Chakula", price: 6500, stock: 12 },
  { id: 3, name: "Sabuni", category: "Usafi", price: 2500, stock: 40 }
];

const initialCustomers = [
  { id: 1, name: "Asha Mohamed", phone: "0712 000 111" },
  { id: 2, name: "John Peter", phone: "0755 000 222" }
];

const money = n => new Intl.NumberFormat("sw-TZ").format(n);

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "", category: "", price: "", stock: ""
  });

  const [customerForm, setCustomerForm] = useState({
    name: "", phone: ""
  });

  const [marketingInput, setMarketingInput] = useState("");
  const [marketingText, setMarketingText] = useState("");

  const totalStock = useMemo(
    () => products.reduce((sum, p) => sum + Number(p.stock), 0),
    [products]
  );

  const revenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.total, 0),
    [orders]
  );

  function addProduct(e) {
    e.preventDefault();

    if (!productForm.name.trim() || Number(productForm.price) <= 0) return;

    setProducts([
      ...products,
      {
        ...productForm,
        id: Date.now(),
        price: Number(productForm.price),
        stock: Number(productForm.stock) || 0
      }
    ]);

    setProductForm({
      name: "", category: "", price: "", stock: ""
    });

    setShowProduct(false);
  }

  function addCustomer(e) {
    e.preventDefault();

    if (!customerForm.name.trim()) return;

    setCustomers([
      ...customers,
      { ...customerForm, id: Date.now() }
    ]);

    setCustomerForm({ name: "", phone: "" });
    setShowCustomer(false);
  }

  function createOrder(product) {
    if (product.stock < 1) return;

    setOrders([
      ...orders,
      {
        id: Date.now(),
        name: product.name,
        total: product.price,
        date: new Date().toLocaleDateString("sw-TZ")
      }
    ]);

    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p
    ));
  }

  function generateMarketing() {
    if (!marketingInput.trim()) return;

    setMarketingText(
      `✨ ${marketingInput}

Unatafuta bidhaa bora kwa bei nzuri?
Tunafurahi kukuhudumia kwa haraka na kwa uaminifu.

Wasiliana nasi leo kwa maelezo zaidi!

📞 Wasiliana nasi kuagiza sasa.
#BiasharaYangu #Tanzania`
    );
  }

  const nav = [
    ["Dashboard", LayoutDashboard],
    ["Wateja", Users],
    ["Bidhaa", Package],
    ["Mauzo", ShoppingCart],
    ["Ankara", FileText],
    ["Msaidizi wa AI", Sparkles]
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">B</div>
          <div>
            <b>BiasharaSmart</b>
            <small>AI BUSINESS MANAGER</small>
          </div>
        </div>

        <div className="workspace">
          <span className="workspace-dot" />
          Biashara yangu
          <span className="chevron">⌄</span>
        </div>

        <p className="nav-label">MENYU KUU</p>

        <nav>
          {nav.map(([label, Icon]) => (
            <button
              key={label}
              className={`nav-link ${page === label ? "active" : ""}`}
              onClick={() => {
                setPage(label);
                setMobileOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <Sparkles size={18} />
            <b>Ukuaji wa biashara</b>
            <p>
              Fuatilia biashara yako na panga hatua zinazofuata.
            </p>
          </div>

          <div className="profile">
            <div className="avatar">BM</div>
            <div>
              <b>Mmiliki wa Biashara</b>
              <small>Mpango wa majaribio</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </button>

          <div>
            <span className="breadcrumb">Biashara yangu</span>
            <span className="crumb-sep"> / </span>
            <b>{page}</b>
          </div>

          <div className="top-actions">
            <span className="status">
              <i /> Mfumo wa majaribio
            </span>
            <div className="avatar">BM</div>
          </div>
        </header>

        <section className="content">
          {page === "Dashboard" && (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">MUHTASARI WA BIASHARA</p>
                  <h1>Karibu kwenye BiasharaSmart</h1>
                  <p className="muted">
                    Muhtasari wa shughuli za biashara yako.
                  </p>
                </div>

                <button
                  className="primary"
                  onClick={() => setPage("Mauzo")}
                >
                  <Plus size={17} /> Rekodi mauzo
                </button>
              </div>

              <div className="stats-grid">
                <Stat
                  title="Jumla ya mauzo"
                  value={`TSh ${money(revenue)}`}
                  note="Mauzo yaliyorekodiwa"
                  icon={TrendingUp}
                />

                <Stat
                  title="Bidhaa / huduma"
                  value={products.length}
                  note="Bidhaa zilizosajiliwa"
                  icon={Boxes}
                />

                <Stat
                  title="Wateja"
                  value={customers.length}
                  note="Wateja waliosajiliwa"
                  icon={Users}
                />

                <Stat
                  title="Bidhaa zilizopo"
                  value={totalStock}
                  note="Jumla ya vipande"
                  icon={Package}
                />
              </div>

              <div className="dashboard-grid">
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <h2>Bidhaa zako</h2>
                      <p className="muted">
                        Bidhaa zilizoongezwa hivi karibuni
                      </p>
                    </div>

                    <button
                      className="text-btn"
                      onClick={() => setPage("Bidhaa")}
                    >
                      Ona zote
                    </button>
                  </div>

                  <ProductTable
                    products={products.slice(0, 4)}
                    onSell={createOrder}
                    compact
                  />
                </div>

                <div className="panel tips">
                  <div className="tip-icon">
                    <Sparkles />
                  </div>

                  <p className="eyebrow">WAZO LA BIASHARA</p>
                  <h2>Simamia biashara kwa mpangilio</h2>
                  <p className="muted">
                    Sajili bidhaa, hifadhi taarifa za wateja na
                    rekodi mauzo ili kufuatilia biashara yako.
                  </p>

                  <button
                    className="outline"
                    onClick={() => setPage("Msaidizi wa AI")}
                  >
                    Jaribu msaidizi wa AI →
                  </button>
                </div>
              </div>
            </>
          )}

          {page === "Bidhaa" && (
            <>
              <PageHeader
                title="Bidhaa na huduma"
                subtitle="Ongeza na fuatilia bidhaa zako."
                action="Ongeza bidhaa"
                onAction={() => setShowProduct(true)}
              />

              <div className="panel">
                <Toolbar
                  search={search}
                  setSearch={setSearch}
                  count={products.length}
                  placeholder="Tafuta bidhaa..."
                />

                <ProductTable
                  products={products.filter(p =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                  )}
                  onSell={createOrder}
                />
              </div>
            </>
          )}

          {page === "Wateja" && (
            <>
              <PageHeader
                title="Wateja"
                subtitle="Hifadhi majina na mawasiliano ya wateja wako."
                action="Ongeza mteja"
                onAction={() => setShowCustomer(true)}
              />

              <div className="panel">
                <Toolbar
                  search={search}
                  setSearch={setSearch}
                  count={customers.length}
                  placeholder="Tafuta mteja..."
                />

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>JINA LA MTEJA</th>
                        <th>SIMU</th>
                        <th>HATUA</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customers
                        .filter(c =>
                          c.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(c => (
                          <tr key={c.id}>
                            <td><b>{c.name}</b></td>
                            <td>{c.phone || "—"}</td>
                            <td>
                              <button
                                className="small-danger"
                                onClick={() =>
                                  setCustomers(customers.filter(x => x.id !== c.id))
                                }
                              >
                                <Trash2 size={15} /> Ondoa
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {page === "Mauzo" && (
            <>
              <PageHeader
                title="Rekodi mauzo"
                subtitle="Chagua bidhaa ili kurekodi mauzo."
              />

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Bidhaa zinazopatikana</h2>
                    <p className="muted">
                      Bonyeza uza kurekodi kipande kimoja.
                    </p>
                  </div>
                </div>

                <ProductTable
                  products={products}
                  onSell={createOrder}
                />
              </div>

              <div className="panel sales-panel">
                <h2>Mauzo yaliyorekodiwa</h2>

                {orders.length ? (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>BIDHAA</th>
                          <th>TAREHE</th>
                          <th>KIASI</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id}>
                            <td>{o.name}</td>
                            <td>{o.date}</td>
                            <td><b>TSh {money(o.total)}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty text="Bado hujarekodi mauzo." />
                )}
              </div>
            </>
          )}

          {page === "Ankara" && (
            <>
              <PageHeader
                title="Ankara"
                subtitle="Sehemu ya kuandaa na kufuatilia ankara."
              />

              <div className="panel empty-large">
                <FileText size={34} />
                <h2>Ankara zitakuja kwenye hatua inayofuata</h2>
                <p className="muted">
                  Tutajenga kipengele cha kutengeneza na kupakua ankara.
                </p>
              </div>
            </>
          )}

          {page === "Msaidizi wa AI" && (
            <>
              <PageHeader
                title="Msaidizi wa masoko"
                subtitle="Andaa maandishi ya kutangaza bidhaa yako."
              />

              <div className="ai-layout">
                <div className="panel">
                  <div className="ai-title">
                    <div className="ai-icon"><Sparkles /></div>
                    <div>
                      <h2>AI Marketing Assistant</h2>
                      <p className="muted">
                        Toleo la majaribio — hutumia kiolezo.
                      </p>
                    </div>
                  </div>

                  <label>
                    Unataka kutangaza bidhaa au huduma gani?
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Mfano: Duka langu linauza viatu..."
                    value={marketingInput}
                    onChange={e => setMarketingInput(e.target.value)}
                  />

                  <button
                    className="primary"
                    onClick={generateMarketing}
                  >
                    <Sparkles size={17} /> Tengeneza tangazo
                  </button>
                </div>

                <div className="panel output-panel">
                  <h2>Matokeo ya tangazo</h2>

                  {marketingText ? (
                    <>
                      <pre>{marketingText}</pre>
                      <button
                        className="outline"
                        onClick={() =>
                          navigator.clipboard?.writeText(marketingText)
                        }
                      >
                        Nakili tangazo
                      </button>
                    </>
                  ) : (
                    <Empty text="Tangazo lako litaonekana hapa." />
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {showProduct && (
        <Modal
          title="Ongeza bidhaa"
          onClose={() => setShowProduct(false)}
        >
          <form onSubmit={addProduct}>
            <Field
              label="Jina la bidhaa"
              value={productForm.name}
              onChange={v => setProductForm({...productForm, name:v})}
              required
            />

            <Field
              label="Aina / kundi"
              value={productForm.category}
              onChange={v => setProductForm({...productForm, category:v})}
            />

            <div className="form-row">
              <Field
                label="Bei (TSh)"
                type="number"
                value={productForm.price}
                onChange={v => setProductForm({...productForm, price:v})}
                required
              />

              <Field
                label="Idadi iliyopo"
                type="number"
                value={productForm.stock}
                onChange={v => setProductForm({...productForm, stock:v})}
              />
            </div>

            <button className="primary full">
              Hifadhi bidhaa
            </button>
          </form>
        </Modal>
      )}

      {showCustomer && (
        <Modal
          title="Ongeza mteja"
          onClose={() => setShowCustomer(false)}
        >
          <form onSubmit={addCustomer}>
            <Field
              label="Jina la mteja"
              value={customerForm.name}
              onChange={v => setCustomerForm({...customerForm, name:v})}
              required
            />

            <Field
              label="Namba ya simu"
              value={customerForm.phone}
              onChange={v => setCustomerForm({...customerForm, phone:v})}
            />

            <button className="primary full">
              Hifadhi mteja
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Stat({title, value, note, icon: Icon}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className="stat-icon"><Icon size={19} /></div>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function PageHeader({title, subtitle, action, onAction}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">USIMAMIZI WA BIASHARA</p>
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
      </div>

      {action && (
        <button className="primary" onClick={onAction}>
          <Plus size={17} /> {action}
        </button>
      )}
    </div>
  );
}

function Toolbar({search, setSearch, count, placeholder}) {
  return (
    <div className="toolbar">
      <div className="searchbox">
        <Search size={17} />
        <input
          placeholder={placeholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <span className="muted">{count} jumla</span>
    </div>
  );
}

function ProductTable({products, onSell, compact = false}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>BIDHAA</th>
            <th>BEI</th>
            <th>IDADI</th>
            {!compact && <th>HATUA</th>}
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <div className="product-name">
                  <div className="product-thumb">
                    <Package size={17} />
                  </div>
                  <div>
                    <b>{p.name}</b>
                    <small>{p.category || "Bila kundi"}</small>
                  </div>
                </div>
              </td>

              <td>TSh {money(p.price)}</td>

              <td>
                <span className={`stock ${p.stock < 5 ? "low" : ""}`}>
                  {p.stock}
                </span>
              </td>

              {!compact && (
                <td>
                  <button
                    className="small-action"
                    disabled={p.stock < 1}
                    onClick={() => onSell(p)}
                  >
                    Uza 1
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <Empty text="Hakuna bidhaa zilizopatikana." />
      )}
    </div>
  );
}

function Empty({text}) {
  return (
    <div className="empty">
      <Package size={24} />
      <p>{text}</p>
    </div>
  );
}

function Modal({title, onClose, children}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({label, value, onChange, type = "text", required = false}) {
  return (
    <label className="field">
      {label}
      <input
        type={type}
        value={value}
        required={required}
        min={type === "number" ? "0" : undefined}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
