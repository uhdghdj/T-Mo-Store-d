const SUPABASE_URL = "https://xenqlrvmmwbsdvyhrrzu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TUusBpSjSYyG7AmGKPiyaA_O_gLU_S5";
const { createClient } = window.supabase;
const STORE_ORDER_RPC = "create_store_order";
const PRODUCT_IMAGE_BUCKET = "product-images";
const BANNER_IMAGE_BUCKET = "product-images";
const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const state = {
  lang: localStorage.getItem("tandmo-lang") || "ar",
  theme: localStorage.getItem("tandmo-theme") || "light",
  page: "dashboard",
  search: "",
  connected: false,
  charts: {},
  pageCache: {},
  pageSize: 10,
  currentPage: 1,
  busy: false,
};

const pageMeta = {
  dashboard: { title: "نظرة عامة", eyebrow: "T AND MO / ADMIN", icon: "layout-dashboard" },
  products: { title: "المنتجات", eyebrow: "CATALOG / PRODUCTS", icon: "shopping-bag" },
  categories: { title: "التصنيفات", eyebrow: "CATALOG / CATEGORIES", icon: "folders" },
  orders: { title: "الطلبات", eyebrow: "COMMERCE / ORDERS", icon: "receipt-text" },
  customers: { title: "العملاء", eyebrow: "RELATIONSHIPS / CUSTOMERS", icon: "users" },
  inventory: { title: "المخزون", eyebrow: "OPERATIONS / INVENTORY", icon: "boxes" },
  coupons: { title: "الكوبونات", eyebrow: "COMMERCE / DISCOUNTS", icon: "ticket-percent" },
  reviews: { title: "التقييمات", eyebrow: "RELATIONSHIPS / REVIEWS", icon: "star" },
  wishlist: { title: "قائمة الرغبات", eyebrow: "RELATIONSHIPS / WISHLIST", icon: "heart" },
  banners: { title: "البنرات", eyebrow: "CONTENT / BANNERS", icon: "panels-top-left" },
  shipping: { title: "الشحن", eyebrow: "OPERATIONS / SHIPPING", icon: "truck" },
  payments: { title: "المدفوعات", eyebrow: "COMMERCE / PAYMENTS", icon: "wallet-cards" },
  analytics: { title: "التحليلات", eyebrow: "INSIGHTS / ANALYTICS", icon: "chart-no-axes-combined" },
  notifications: { title: "الإشعارات", eyebrow: "SYSTEM / NOTIFICATIONS", icon: "bell" },
  settings: { title: "الإعدادات", eyebrow: "SYSTEM / SETTINGS", icon: "settings-2" },
};

const navGroups = [
  { label: "النظرة العامة", items: ["dashboard"] },
  { label: "المتجر", items: ["products", "categories", "orders", "customers", "inventory"] },
  { label: "التفاعل", items: ["coupons", "reviews", "wishlist", "banners"] },
  { label: "التشغيل", items: ["shipping", "payments", "analytics"] },
  { label: "النظام", items: ["notifications", "settings"] },
];

const I18N = {
  ar: {
    adminSpace: "مساحة الإدارة", checkingConnection: "فحص الاتصال…", readOnlyTitle: "وضع القراءة فقط", loading: "جارٍ تحميل البيانات…", loadingHint: "نتحقق من أحدث حالة في Supabase.",
    all: "الكل", refresh: "تحديث", export: "تصدير CSV", add: "إضافة", edit: "تعديل", delete: "حذف", save: "حفظ", cancel: "إلغاء", close: "إغلاق", view: "عرض", search: "بحث", noData: "لا توجد بيانات", noDataHint: "لم تُرجع قاعدة البيانات سجلات لهذا القسم بعد.", errorTitle: "تعذر تحميل البيانات", retry: "إعادة المحاولة", readOnly: "قراءة فقط", records: "سجلات", next: "التالي", previous: "السابق", page: "صفحة", of: "من", actions: "الإجراءات", status: "الحالة", createdAt: "تاريخ الإنشاء", total: "الإجمالي", quantity: "الكمية", price: "السعر", order: "الطلب", customer: "العميل", product: "المنتج", unknown: "غير محدد", notAvailable: "غير متاح", operationFailed: "فشلت العملية", operationSuccess: "تم تنفيذ العملية بنجاح", connectionFailed: "تعذر الاتصال بـ Supabase", connected: "متصل بـ Supabase", dashboardIntro: "صورة واضحة لحركة متجرك، مبنية على بياناتك الفعلية.", last7: "آخر 7 أيام", last30: "آخر 30 يوماً", revenue: "الإيرادات", orders: "الطلبات", newOrders: "طلبات جديدة", processingOrders: "قيد التنفيذ", deliveredOrders: "تم التسليم", cancelledOrders: "ملغاة", products: "المنتجات", outOfStock: "نافدة", lowStock: "منخفضة المخزون", customers: "العملاء", avgOrder: "متوسط الطلب", estimatedProfit: "الربح التقديري", recentOrders: "أحدث الطلبات", bestProducts: "الأكثر مبيعاً", lowStockProducts: "تنبيه المخزون", latestNotifications: "آخر الإشعارات", salesTrend: "مسار المبيعات", orderStatus: "توزيع حالات الطلبات", noChartData: "لا توجد بيانات كافية للرسم بعد", productName: "اسم المنتج", sku: "SKU", category: "التصنيف", originalPrice: "السعر الأصلي", salePrice: "سعر العرض", costPrice: "سعر التكلفة", stock: "المخزون", sold: "المباع", active: "نشط", inactive: "غير نشط", addProduct: "إضافة منتج", productDetails: "بيانات المنتج", arabicName: "الاسم العربي", englishName: "الاسم الإنجليزي", arabicDescription: "الوصف العربي", englishDescription: "الوصف الإنجليزي", barcode: "الباركود", threshold: "حد المخزون المنخفض", weight: "الوزن", featured: "منتج مميز", newProduct: "منتج جديد", freeShipping: "شحن مجاني", categoryId: "معرّف التصنيف", addCategory: "إضافة تصنيف", categoryDetails: "بيانات التصنيف", description: "الوصف", parentCategory: "التصنيف الرئيسي", sortOrder: "ترتيب العرض", orderNumber: "رقم الطلب", phone: "الهاتف", address: "العنوان", governorate: "المحافظة", paymentMethod: "طريقة الدفع", paymentStatus: "حالة الدفع", orderStatus: "حالة الطلب", orderDetails: "تفاصيل الطلب", changeStatus: "تغيير الحالة", statusHistory: "سجل الحالات", printInvoice: "طباعة الفاتورة", adjustStock: "تعديل المخزون", movementType: "نوع الحركة", increase: "زيادة", decrease: "تقليل", reason: "سبب التعديل", approve: "موافقة", reject: "رفض", markRead: "تعليم كمقروء", markAllRead: "تعليم الكل كمقروء", addCoupon: "إضافة كوبون", couponCode: "كود الخصم", discountType: "نوع الخصم", discountValue: "قيمة الخصم", usageLimit: "حد الاستخدام", expiration: "تاريخ الانتهاء", reportPeriod: "الفترة", today: "اليوم", thisMonth: "هذا الشهر", thisYear: "هذا العام", dataSource: "المصدر: Supabase / بيانات حقيقية", categories: "التصنيفات", inventory: "المخزون", coupons: "الكوبونات", reviews: "التقييمات", wishlist: "قائمة الرغبات", banners: "البنرات", shipping: "الشحن", payments: "المدفوعات", analytics: "التحليلات", notifications: "الإشعارات", settings: "الإعدادات", pending: "قيد المراجعة", settingsReadOnly: "تعتمد قابلية تعديل الإعدادات على أعمدة store_settings وسياسات RLS الحالية.", shippingPrice: "سعر الشحن", shippingZoneName: "اسم المحافظة", addShippingZone: "إضافة محافظة", shippingZoneDetails: "بيانات محافظة الشحن", enabled: "مفعلة", disabled: "غير مفعلة", sortByName: "ترتيب أبجدي", sortByPriceAsc: "السعر: الأقل أولاً", sortByPriceDesc: "السعر: الأعلى أولاً", allStatuses: "كل الحالات", duplicateShippingZone: "اسم المحافظة مستخدم بالفعل.", invalidShippingPrice: "أدخل سعراً صحيحاً غير سالب.", confirmDeleteShipping: "حذف محافظة الشحن؟ إذا كانت مرتبطة بطلبات سابقة فلن تتأثر بيانات الطلبات التاريخية.", shippingSchemaHint: "المصدر: shipping_zones · السعر محفوظ مع الطلب عند إنشائه",  
  },
  en: {
    adminSpace: "Admin workspace", checkingConnection: "Checking connection…", readOnlyTitle: "Read-only mode", loading: "Loading data…", loadingHint: "Checking the latest Supabase state.", all: "All", refresh: "Refresh", export: "Export CSV", add: "Add", edit: "Edit", delete: "Delete", save: "Save", cancel: "Cancel", close: "Close", view: "View", search: "Search", noData: "No data", noDataHint: "The database has not returned records for this section yet.", errorTitle: "Could not load data", retry: "Retry", readOnly: "Read only", records: "records", next: "Next", previous: "Previous", page: "Page", of: "of", actions: "Actions", status: "Status", createdAt: "Created", total: "Total", quantity: "Qty", price: "Price", order: "Order", customer: "Customer", product: "Product", unknown: "Unknown", notAvailable: "Not available", operationFailed: "Operation failed", operationSuccess: "Operation completed", connectionFailed: "Could not connect to Supabase", connected: "Connected to Supabase", dashboardIntro: "A clear view of your store, built from live data.", last7: "Last 7 days", last30: "Last 30 days", revenue: "Revenue", orders: "Orders", newOrders: "New orders", processingOrders: "Processing", deliveredOrders: "Delivered", cancelledOrders: "Cancelled", products: "Products", outOfStock: "Out of stock", lowStock: "Low stock", customers: "Customers", avgOrder: "Avg. order", estimatedProfit: "Estimated profit", recentOrders: "Recent orders", bestProducts: "Best sellers", lowStockProducts: "Stock alerts", latestNotifications: "Latest notifications", salesTrend: "Sales trend", orderStatus: "Order status", noChartData: "Not enough data to chart yet", productName: "Product name", sku: "SKU", category: "Category", originalPrice: "Original price", salePrice: "Sale price", costPrice: "Cost price", stock: "Stock", sold: "Sold", active: "Active", inactive: "Inactive", addProduct: "Add product", productDetails: "Product details", arabicName: "Arabic name", englishName: "English name", arabicDescription: "Arabic description", englishDescription: "English description", barcode: "Barcode", threshold: "Low stock threshold", weight: "Weight", featured: "Featured", newProduct: "New product", freeShipping: "Free shipping", categoryId: "Category ID", addCategory: "Add category", categoryDetails: "Category details", description: "Description", parentCategory: "Parent category", sortOrder: "Sort order", orderNumber: "Order number", phone: "Phone", address: "Address", governorate: "Governorate", paymentMethod: "Payment method", paymentStatus: "Payment status", orderStatus: "Order status", orderDetails: "Order details", changeStatus: "Change status", statusHistory: "Status history", printInvoice: "Print invoice", adjustStock: "Adjust stock", movementType: "Movement", increase: "Increase", decrease: "Decrease", reason: "Reason", approve: "Approve", reject: "Reject", markRead: "Mark read", markAllRead: "Mark all read", addCoupon: "Add coupon", couponCode: "Coupon code", discountType: "Discount type", discountValue: "Discount value", usageLimit: "Usage limit", expiration: "Expiration", reportPeriod: "Period", today: "Today", thisMonth: "This month", thisYear: "This year", dataSource: "Source: Supabase / live data", categories: "Categories", inventory: "Inventory", coupons: "Coupons", reviews: "Reviews", wishlist: "Wishlist", banners: "Banners", shipping: "Shipping", payments: "Payments", analytics: "Analytics", notifications: "Notifications", settings: "Settings", pending: "Pending", settingsReadOnly: "Settings editing depends on the current store_settings columns and RLS policies.", shippingPrice: "Shipping price", shippingZoneName: "Governorate", addShippingZone: "Add governorate", shippingZoneDetails: "Shipping zone details", enabled: "Enabled", disabled: "Disabled", sortByName: "Alphabetical", sortByPriceAsc: "Price: low to high", sortByPriceDesc: "Price: high to low", allStatuses: "All statuses", duplicateShippingZone: "This governorate name is already used.", invalidShippingPrice: "Enter a valid non-negative price.", confirmDeleteShipping: "Delete this shipping zone? Historical order shipping data will remain unchanged.", shippingSchemaHint: "Source: shipping_zones · price is snapshotted on order creation", shippingPrice: "Shipping price", shippingZoneName: "Governorate", addShippingZone: "Add governorate", shippingZoneDetails: "Shipping zone details", enabled: "Enabled", disabled: "Disabled", sortByName: "Alphabetical", sortByPriceAsc: "Price: low to high", sortByPriceDesc: "Price: high to low", allStatuses: "All statuses", duplicateShippingZone: "This governorate name is already used.", invalidShippingPrice: "Enter a valid non-negative price.", confirmDeleteShipping: "Delete this shipping zone? Historical order shipping data will remain unchanged.", shippingSchemaHint: "Source: shipping_zones · price is snapshotted on order creation", shippingPrice: "Shipping price", shippingZoneName: "Governorate", addShippingZone: "Add governorate", shippingZoneDetails: "Shipping zone details", enabled: "Enabled", disabled: "Disabled", sortByName: "Alphabetical", sortByPriceAsc: "Price: low to high", sortByPriceDesc: "Price: high to low", allStatuses: "All statuses", duplicateShippingZone: "This governorate name is already used.", invalidShippingPrice: "Enter a valid non-negative price.", confirmDeleteShipping: "Delete this shipping zone? Historical order shipping data will remain unchanged.", shippingSchemaHint: "Source: shipping_zones · price is snapshotted on order creation", shippingPrice: "Shipping price", shippingZoneName: "Governorate", addShippingZone: "Add governorate", shippingZoneDetails: "Shipping zone details", enabled: "Enabled", disabled: "Disabled", sortByName: "Alphabetical", sortByPriceAsc: "Price: low to high", sortByPriceDesc: "Price: high to low", allStatuses: "All statuses", duplicateShippingZone: "This governorate name is already used.", invalidShippingPrice: "Enter a valid non-negative price.", confirmDeleteShipping: "Delete this shipping zone? Historical order shipping data will remain unchanged.", shippingSchemaHint: "Source: shipping_zones · price is snapshotted on order creation", 
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => I18N[state.lang][key] || I18N.ar[key] || key;
const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
const num = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const money = (value) => `${num(value).toLocaleString(state.lang === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 2 })} EGP`;
const integer = (value) => num(value).toLocaleString(state.lang === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 0 });
const dateText = (value) => value ? new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";
const shortDate = (value) => value ? new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium" }).format(new Date(value)) : "—";
const valueOf = (row, keys, fallback = "") => { for (const key of keys) if (row?.[key] !== undefined && row?.[key] !== null && row?.[key] !== "") return row[key]; return fallback; };
const statusLabel = (value) => ({ new: state.lang === "ar" ? "جديد" : "New", confirmed: state.lang === "ar" ? "مؤكد" : "Confirmed", processing: state.lang === "ar" ? "قيد التنفيذ" : "Processing", shipped: state.lang === "ar" ? "تم الشحن" : "Shipped", delivered: state.lang === "ar" ? "تم التسليم" : "Delivered", cancelled: state.lang === "ar" ? "ملغى" : "Cancelled", refunded: state.lang === "ar" ? "مسترد" : "Refunded" }[String(value || "").toLowerCase()] || value || t("unknown"));
const statusClass = (value) => { const v = String(value || "").toLowerCase(); if (["delivered", "paid", "approved", "active", "confirmed"].includes(v)) return "status-success"; if (["cancelled", "refunded", "rejected", "failed", "inactive"].includes(v)) return "status-danger"; if (["processing", "shipped", "pending", "new"].includes(v)) return "status-warning"; return "status-neutral"; };
const icon = (name) => `<i data-lucide="${name}"></i>`;
const refreshIcons = () => window.lucide?.createIcons({ attrs: { "stroke-width": 1.7 } });
const safeSearch = (value) => String(value).replace(/[(),]/g, " ").trim();

function setHTML(element, html) { element.innerHTML = html; refreshIcons(); }
function loadingMarkup() { return `<div class="loading-state"><div class="spinner"></div><strong>${t("loading")}</strong><span>${t("loadingHint")}</span></div>`; }
function emptyMarkup(message = t("noData"), hint = t("noDataHint")) { return `<div class="empty-state">${icon("inbox")}<strong>${escapeHtml(message)}</strong><span>${escapeHtml(hint)}</span></div>`; }
function errorMarkup(message) { return `<div class="error-state">${icon("triangle-alert")}<strong>${t("errorTitle")}</strong><span>${escapeHtml(message)}</span><button class="btn btn-sm" data-action="refresh">${icon("refresh-cw")} ${t("retry")}</button></div>`; }
function toast(title, message, type = "info") { const stack = $("#toastStack"); const node = document.createElement("div"); node.className = `toast toast-${type}`; node.innerHTML = `${icon(type === "success" ? "check-circle-2" : type === "error" ? "circle-x" : "info")}<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`; stack.appendChild(node); refreshIcons(); setTimeout(() => node.remove(), 4800); }
function setBusy(value) { state.busy = value; $$(`[data-submit]`).forEach((button) => { button.disabled = value; }); }
function openModal(title, body, eyebrow = "T AND MO") { $("#modalTitle").textContent = title; $("#modalEyebrow").textContent = eyebrow; setHTML($("#modalBody"), body); $("#modalBackdrop").classList.remove("hidden"); }
function closeModal() { $("#modalBackdrop").classList.add("hidden"); }
function openDrawer(title, body) { $("#drawerTitle").textContent = title; setHTML($("#drawerBody"), body); $("#drawerBackdrop").classList.remove("hidden"); }
function closeDrawer() { $("#drawerBackdrop").classList.add("hidden"); }
function pageTitle(page = state.page) { return pageMeta[page]?.title || page; }

async function queryRows(table, { page = 1, pageSize = state.pageSize, search = "", searchColumns = [], eq = [], order = "created_at", ascending = false, count = true, limit } = {}) {
  let query = db.from(table).select("*", count ? { count: "exact" } : undefined);
  for (const filter of eq) if (filter.value !== undefined && filter.value !== "") query = query.eq(filter.column, filter.value);
  if (search && searchColumns.length) query = query.or(searchColumns.map((column) => `${column}.ilike.%${safeSearch(search)}%`).join(","));
  if (order) query = query.order(order, { ascending, nullsFirst: false });
  const from = limit ? 0 : (page - 1) * pageSize;
  const to = limit ? limit - 1 : from + pageSize - 1;
  query = query.range(from, to);
  const result = await query;
  return { data: result.data || [], count: result.count ?? result.data?.length ?? 0, error: result.error };
}
async function getAll(table, options = {}) { return queryRows(table, { ...options, page: 1, limit: options.limit || 100 }); }
async function callRpc(name, params) { const result = await db.rpc(name, params); if (result.error) throw result.error; return result.data; }
async function createStoreOrder(payload) { return callRpc(STORE_ORDER_RPC, payload); }
async function runWrite(callback) { setBusy(true); try { await callback(); return true; } catch (error) { console.error(error); toast(t("operationFailed"), error.message || String(error), "error"); return false; } finally { setBusy(false); } }

function renderNav() {
  const nav = $("#navList");
  nav.innerHTML = navGroups.map((group) => `<div class="nav-section-label">${escapeHtml(group.label)}</div>${group.items.map((page) => `<button class="nav-item ${state.page === page ? "active" : ""}" data-nav="${page}">${icon(pageMeta[page].icon)}<span class="nav-label">${escapeHtml(pageTitle(page))}</span></button>`).join("")}`).join("");
  refreshIcons();
}
function applyPreferences() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  $("#languageToggle").textContent = state.lang === "ar" ? "EN" : "ع";
  $("#themeToggle").innerHTML = icon(state.theme === "dark" ? "moon" : "sun");
  $("#todayLabel").textContent = new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium" }).format(new Date());
  refreshIcons();
}
function setPageChrome() { const meta = pageMeta[state.page]; $("#pageTitle").textContent = meta.title; $("#pageEyebrow").textContent = meta.eyebrow; renderNav(); }
function renderAccessState() {
  const pill = $("#connectionPill");
  pill.classList.toggle("is-online", state.connected);
  pill.classList.toggle("is-offline", !state.connected);
  $("#connectionPill span:last-child").textContent = state.connected ? t("connected") : t("connectionFailed");
  $("#accessBanner")?.classList.add("hidden");
  $("#accessMessage") && ($("#accessMessage").textContent = "");
  $("#accessState") && ($("#accessState").textContent = "OPEN");
  $("#adminName") && ($("#adminName").textContent = state.lang === "ar" ? "مساحة الإدارة" : "Admin workspace");
  $("#adminRole") && ($("#adminRole").textContent = state.lang === "ar" ? "وصول مباشر" : "Direct access");
}

async function checkConnection() {
  try {
    const probe = await db.from("products").select("id", { count: "exact", head: true });
    state.connected = !probe.error || ![401, 403].includes(probe.error?.status);
  } catch (error) {
    state.connected = false;
    console.error(error);
  }
  renderAccessState();
}

function metricCard(label, value, iconName, note = "") { return `<article class="metric-card"><div class="metric-top"><span>${escapeHtml(label)}</span><span class="metric-icon">${icon(iconName)}</span></div><div class="metric-value">${escapeHtml(value)}</div><span class="metric-note">${escapeHtml(note)}</span></article>`; }
function panel(title, subtitle, body, extra = "") { return `<section class="panel"><header class="panel-header"><div class="panel-title"><h3>${escapeHtml(title)}</h3><span>${escapeHtml(subtitle)}</span></div>${extra}</header><div class="panel-body">${body}</div></section>`; }
function sum(rows, keys) { return rows.reduce((total, row) => total + num(valueOf(row, keys)), 0); }
function productName(row) { return valueOf(row, state.lang === "ar" ? ["name_ar", "name", "name_en"] : ["name", "name_en", "name_ar"], t("unknown")); }
function orderTotal(row) { return num(valueOf(row, ["total", "grand_total", "amount", "order_total"])); }
function productPrice(row) { return num(valueOf(row, ["sale_price", "price"])); }
function productStock(row) { return num(valueOf(row, ["stock", "quantity", "available_stock"])); }

const DEFAULT_PRODUCT_IMAGE_ICON = "package";
function normalizeProductImageUrl(value) {
  if (!value) return "";
  const raw = typeof value === "object" ? value.url || value.image_url || value.path || value.storage_path || value.file_path || "" : value;
  if (!raw) return "";
  if (/^(https?:|data:|blob:)/i.test(String(raw))) return String(raw);
  return db.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(String(raw).replace(/^\/+/, "")).data.publicUrl || "";
}
function productImageUrls(product = {}, relatedImages = []) {
  const values = [];
  const productValues = [product.image_url, product.image, product.thumbnail_url, product.images, product.image_urls];
  productValues.forEach((value) => {
    if (Array.isArray(value)) values.push(...value);
    else if (value && typeof value === "string" && value.trim().startsWith("[")) { try { values.push(...JSON.parse(value)); } catch (_) { values.push(value); } }
    else if (value) values.push(value);
  });
  values.push(...(Array.isArray(relatedImages) ? relatedImages : []));
  return [...new Set(values.map(normalizeProductImageUrl).filter(Boolean))];
}
function productImage(product = {}, relatedImages = []) {
  const url = productImageUrls(product, relatedImages)[0];
  return url ? `<img class="product-thumb" src="${escapeHtml(url)}" alt="${escapeHtml(productName(product))}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'product-thumb', innerHTML: '${icon(DEFAULT_PRODUCT_IMAGE_ICON).replace(/'/g, "\\'")}' }))" />` : `<span class="product-thumb">${icon(DEFAULT_PRODUCT_IMAGE_ICON)}</span>`;
}
async function loadProductImages(productIds = []) {
  if (!productIds.length) return new Map();
  const result = await db.from("product_images").select("*").in("product_id", productIds);
  if (result.error || !result.data?.length) return new Map();
  const map = new Map();
  result.data.forEach((image) => {
    const id = image.product_id;
    if (!id) return;
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(image);
  });
  for (const [id, images] of map) images.sort((a, b) => Number(Boolean(b.is_primary)) - Number(Boolean(a.is_primary)) || num(a.sort_order ?? a.display_order) - num(b.sort_order ?? b.display_order));
  return map;
}
async function uploadProductImages(files, productId) {
  const urls = [];
  for (const file of files) {
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) throw new Error(state.lang === "ar" ? "يرجى اختيار صور أقل من 5MB." : "Please choose images smaller than 5MB.");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const uniqueId = globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const path = `products/${productId}/${Date.now()}-${uniqueId}-${safeName}`;
    const upload = await db.storage.from(PRODUCT_IMAGE_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
    if (upload.error) throw upload.error;
    urls.push(db.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl);
  }
  return urls;
}
async function uploadCategoryImage(file, categoryId) {
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
    throw new Error(state.lang === "ar" ? "يرجى اختيار صورة أقل من 5MB." : "Please choose an image smaller than 5MB.");
  }
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const uniqueId = globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path = `categories/${categoryId}/${Date.now()}-${uniqueId}-${safeName}`;
  const upload = await db.storage.from(PRODUCT_IMAGE_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
  if (upload.error) throw upload.error;
  return db.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
async function uploadBannerImage(file, bannerId) {
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) throw new Error(state.lang === "ar" ? "يرجى اختيار صورة أقل من 5MB." : "Please choose an image smaller than 5MB.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const uniqueId = globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path = `banners/${bannerId}/${Date.now()}-${uniqueId}-${safeName}`;
  const upload = await db.storage.from(BANNER_IMAGE_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
  if (upload.error) throw upload.error;
  return db.storage.from(BANNER_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function saveProductImageRecords(productId, urls) {
  if (!productId || !urls.length) return;
  const rows = urls.map((url, index) => ({ product_id: productId, image_url: url, is_primary: index === 0, sort_order: index }));
  const result = await db.from("product_images").insert(rows);
  if (result.error) console.warn("product_images insert skipped:", result.error.message);
}


async function renderDashboard() {
  setHTML($("#content"), loadingMarkup());
  const results = await Promise.all([getAll("orders", { order: "created_at", ascending: false, limit: 100 }), getAll("products", { order: "created_at", ascending: false, limit: 100 }), getAll("order_items", { order: "created_at", ascending: false, limit: 300 }), getAll("profiles", { order: "created_at", ascending: false, limit: 100 }), getAll("notifications", { order: "created_at", ascending: false, limit: 8 })]);
  const [ordersRes, productsRes, itemsRes, customersRes, notificationsRes] = results;
  const firstError = results.find((result) => result.error);
  const orders = ordersRes.data, products = productsRes.data, items = itemsRes.data, customers = customersRes.data, notifications = notificationsRes.data;
  const revenue = sum(orders.filter((o) => !["cancelled", "refunded"].includes(String(o.status || "").toLowerCase())), ["total", "grand_total"]);
  const delivered = orders.filter((o) => String(o.status || "").toLowerCase() === "delivered");
  const profit = delivered.reduce((total, order) => total + items.filter((item) => item.order_id === order.id).reduce((p, item) => p + (num(valueOf(item, ["price", "unit_price"])) - num(item.cost_price)) * num(item.quantity), 0), 0);
  const low = products.filter((p) => { const threshold = num(valueOf(p, ["low_stock_threshold"], 5)); return productStock(p) > 0 && productStock(p) <= threshold; });
  const out = products.filter((p) => productStock(p) <= 0);
  const statuses = { new: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, refunded: 0 };
  orders.forEach((o) => { const key = String(o.status || "").toLowerCase(); if (statuses[key] !== undefined) statuses[key] += 1; });
  const latest = orders.slice(0, 6);
  const popular = Object.entries(items.reduce((map, item) => { const key = item.product_id || item.product_sku || item.product_name || "unknown"; map[key] = (map[key] || 0) + num(item.quantity); return map; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const subtitle = firstError ? `${t("dataSource")} · ${firstError.error.message || "schema/RLS"}` : t("dataSource");
  const recentOrdersMarkup = latest.length ? `<div class="list-stack">${latest.map((order) => `<button class="list-item" data-action="show-order" data-id="${escapeHtml(order.id)}"><span class="list-icon">${icon("receipt")}</span><span class="list-copy"><strong>${escapeHtml(valueOf(order, ["order_number", "id"], t("order")))}</strong><span>${escapeHtml(valueOf(order, ["customer_name", "customer_phone"], t("unknown")))} · ${shortDate(order.created_at)}</span></span><strong class="list-value">${money(orderTotal(order))}</strong></button>`).join("")}</div>` : emptyMarkup();
  const bestProductsMarkup = popular.length ? `<div class="list-stack">${popular.map(([key, qty]) => { const item = items.find((row) => (row.product_id || row.product_sku || row.product_name || "unknown") === key); return `<div class="list-item"><span class="list-icon">${icon("trending-up")}</span><span class="list-copy"><strong>${escapeHtml(valueOf(item, ["product_name", "name"], key))}</strong><span>${integer(qty)} ${t("sold")}</span></span><strong class="list-value">${integer(qty)}</strong></div>`; }).join("")}</div>` : emptyMarkup();
  const lowStockMarkup = low.length ? `<div class="list-stack">${low.slice(0, 6).map((p) => `<div class="list-item"><span class="list-icon">${icon("package-open")}</span><span class="list-copy"><strong>${escapeHtml(productName(p))}</strong><span>${t("stock")}: ${integer(productStock(p))} · ${t("threshold")}: ${integer(valueOf(p, ["low_stock_threshold"], 5))}</span></span><span class="status status-warning">${t("lowStock")}</span></div>`).join("")}</div>` : emptyMarkup();
  const notificationsMarkup = notifications.length ? `<div class="list-stack">${notifications.map((n) => `<div class="list-item"><span class="list-icon">${icon(n.is_read ? "mail-open" : "mail")}</span><span class="list-copy"><strong>${escapeHtml(valueOf(n, ["title", "type"], t("unknown")))}</strong><span>${escapeHtml(valueOf(n, ["message", "body"], ""))} · ${shortDate(n.created_at)}</span></span><span class="status ${n.is_read ? "status-neutral" : "status-warning"}">${n.is_read ? (state.lang === "ar" ? "مقروء" : "Read") : (state.lang === "ar" ? "جديد" : "New")}</span></div>`).join("")}</div>` : emptyMarkup();
  setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">T AND MO / LIVE OVERVIEW</span><h2>${state.lang === "ar" ? "صباح هادئ، وقرارات أوضح." : "A calmer view for sharper decisions."}</h2><p>${t("dashboardIntro")}</p></div><div class="action-row"><button class="btn" data-action="refresh">${icon("refresh-cw")} ${t("refresh")}</button><button class="btn btn-primary" data-action="navigate" data-page="analytics">${icon("chart-no-axes-combined")} ${state.lang === "ar" ? "فتح التحليلات" : "Open analytics"}</button></div></div>
  <div class="metrics-grid">${metricCard(t("revenue"), money(revenue), "banknote", subtitle)}${metricCard(t("orders"), integer(orders.length), "receipt-text", `${integer(orders.filter((o) => String(o.status || "").toLowerCase() === "new").length)} ${t("newOrders")}`)}${metricCard(t("processingOrders"), integer(orders.filter((o) => ["processing", "confirmed", "shipped"].includes(String(o.status || "").toLowerCase())).length), "package-check", "Confirmed · Shipped")}${metricCard(t("deliveredOrders"), integer(delivered.length), "badge-check", t("dataSource"))}${metricCard(t("products"), integer(products.length), "shopping-bag", `${integer(out.length)} ${t("outOfStock")}`)}${metricCard(t("lowStock"), integer(low.length), "triangle-alert", `${integer(out.length)} ${t("outOfStock")}`)}${metricCard(t("customers"), integer(customers.length), "users", t("dataSource"))}${metricCard(t("avgOrder"), money(orders.length ? revenue / orders.length : 0), "calculator", `${integer(orders.length)} ${t("orders")}`)}${metricCard(t("estimatedProfit"), money(profit), "sparkles", state.lang === "ar" ? "للطلبات المسلّمة فقط" : "Delivered orders only")}</div>
  <div class="panel-grid"><div id="salesPanel">${panel(t("salesTrend"), t("last7"), `<div class="chart-wrap"><canvas id="salesChart"></canvas></div>`, `<div class="chart-tabs"><button class="chart-tab active" data-chart-days="7">7D</button><button class="chart-tab" data-chart-days="30">30D</button></div>`)}</div><div id="statusPanel">${panel(t("orderStatus"), t("dataSource"), `<div class="chart-wrap"><canvas id="statusChart"></canvas></div>`)}</div></div>
  <div class="panel-grid"><div>${panel(t("recentOrders"), `${integer(latest.length)} ${t("records")}`, recentOrdersMarkup)}</div><div>${panel(t("bestProducts"), t("dataSource"), bestProductsMarkup)}</div></div>
  <div class="panel-grid"><div>${panel(t("lowStockProducts"), t("dataSource"), lowStockMarkup)}</div><div>${panel(t("latestNotifications"), t("dataSource"), notificationsMarkup)}</div></div>`);
  renderDashboardCharts(orders, state.chartDays || 7);
  window.__dashboardOrders = orders;
  window.__dashboardItems = items;
}

function renderDashboardCharts(orders, days = 7) {
  state.chartDays = days; const salesCanvas = $("#salesChart"), statusCanvas = $("#statusChart"); if (!salesCanvas || !statusCanvas || !window.Chart) return;
  Object.values(state.charts).forEach((chart) => chart.destroy()); state.charts = {};
  const labels = [], values = []; for (let i = days - 1; i >= 0; i -= 1) { const day = new Date(); day.setHours(0, 0, 0, 0); day.setDate(day.getDate() - i); labels.push(new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "short" }).format(day)); const dateKey = day.toISOString().slice(0, 10); values.push(orders.filter((o) => o.created_at?.slice(0, 10) === dateKey).reduce((sumValue, o) => sumValue + orderTotal(o), 0)); }
  const colors = getComputedStyle(document.documentElement); const accent = colors.getPropertyValue("--accent").trim(); const line = colors.getPropertyValue("--line").trim(); const muted = colors.getPropertyValue("--muted").trim();
  state.charts.sales = new Chart(salesCanvas, { type: "line", data: { labels, datasets: [{ data: values, borderColor: accent, backgroundColor: `${accent}22`, fill: true, tension: .38, pointRadius: 2, pointHoverRadius: 5, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => money(context.raw) } } }, scales: { x: { grid: { display: false }, ticks: { color: muted, font: { family: "Cairo", size: 10 } } }, y: { grid: { color: line }, ticks: { color: muted, font: { family: "Cairo", size: 10 }, callback: (value) => `${num(value).toLocaleString()} EGP` } } } } });
  const statuses = ["new", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"]; const statusValues = statuses.map((status) => orders.filter((o) => String(o.status || "").toLowerCase() === status).length); state.charts.status = new Chart(statusCanvas, { type: "doughnut", data: { labels: statuses.map(statusLabel), datasets: [{ data: statusValues, backgroundColor: ["#d6a23a", "#a88962", "#8aa6a0", "#7890b2", "#2e8b57", "#d9534f", "#8c6aa8"], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "72%", plugins: { legend: { position: "bottom", labels: { color: muted, boxWidth: 9, usePointStyle: true, font: { family: "Cairo", size: 10 }, padding: 12 } } } } });
}

function tableHeader(columns) { return `<thead><tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr></thead>`; }
function pagination(count, page = state.currentPage, size = state.pageSize) { const pages = Math.max(1, Math.ceil(count / size)); return `<div class="pagination"><span>${t("page")} ${page} ${t("of")} ${pages} · ${integer(count)} ${t("records")}</span><div class="pagination-actions"><button class="btn btn-sm" data-action="page" data-page-number="${page - 1}" ${page <= 1 ? "disabled" : ""}>${icon("chevron-right")} ${t("previous")}</button><button class="btn btn-sm" data-action="page" data-page-number="${page + 1}" ${page >= pages ? "disabled" : ""}>${t("next")} ${icon("chevron-left")}</button></div></div>`; }
function toolbar(searchPlaceholder, addAction = "", addLabel = t("add"), extra = "") { return `<div class="table-toolbar"><div class="toolbar-start"><label class="inline-search"><i data-lucide="search"></i><input data-table-search type="search" placeholder="${escapeHtml(searchPlaceholder)}" value="${escapeHtml(state.search)}" /></label>${extra}</div><div class="toolbar-end"><button class="btn" data-action="refresh">${icon("refresh-cw")} ${t("refresh")}</button><button class="btn" data-action="export-current">${icon("download")} ${t("export")}</button>${addAction ? `<button class="btn btn-primary" data-action="${addAction}">${icon("plus")} ${escapeHtml(addLabel)}</button>` : ""}</div></div>`; }
function tableShell(toolbarHtml, tableHtml, foot = "") { return `<section class="table-panel">${toolbarHtml}<div class="table-scroll">${tableHtml}</div>${foot}</section>`; }

async function renderProducts() {
  setHTML($("#content"), loadingMarkup());
  state.currentPage = state.currentPage || 1;
  const result = await queryRows("products", { page: state.currentPage, search: state.search, searchColumns: ["name", "name_ar", "sku"], order: "created_at" });
  if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; }
  const rows = result.data || [];
  const imageMap = await loadProductImages(rows.map((product) => product.id).filter(Boolean));
  const columns = [{ label: t("product") }, { label: t("sku") }, { label: t("category") }, { label: t("originalPrice") }, { label: t("salePrice") }, { label: t("stock") }, { label: t("status") }, { label: t("actions") }];
  const body = rows.length ? `<table>${tableHeader(columns)}<tbody>${rows.map((p) => `<tr><td><div class="product-cell">${productImage(p, imageMap.get(p.id))}<span><strong>${escapeHtml(productName(p))}</strong><span>${escapeHtml(valueOf(p, ["name", "name_ar"], ""))}</span></span></div></td><td>${escapeHtml(valueOf(p, ["sku"], "—"))}</td><td>${escapeHtml(valueOf(p, ["category_name"], "—"))}</td><td>${money(valueOf(p, ["price"]))}</td><td>${money(valueOf(p, ["sale_price"]))}</td><td><strong>${integer(productStock(p))}</strong><br><small class="muted">${t("threshold")}: ${integer(valueOf(p, ["low_stock_threshold"], 5))}</small></td><td><span class="status ${p.is_active === false ? "status-danger" : "status-success"}">${p.is_active === false ? t("inactive") : t("active")}</span></td><td><span class="row-actions"><button class="row-action" data-action="edit-product" data-id="${escapeHtml(p.id)}" title="${t("edit")}">${icon("pencil")}</button><button class="row-action" data-action="delete-product" data-id="${escapeHtml(p.id)}" title="${t("delete")}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup();
  setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.products.eyebrow}</span><h2>${t("products")}</h2><p>${state.lang === "ar" ? "الكتالوج كما هو محفوظ في قاعدة بياناتك." : "Your catalog exactly as stored in the database."}</p></div></div>${tableShell(toolbar(t("productName"), "add-product", t("addProduct")), body, pagination(result.count, state.currentPage))}`);
}
function productForm(product = {}, categories = []) { const imageUrl = productImageUrls(product)[0] || ""; const categoryOptions = categories.map((category) => `<option value="${escapeHtml(category.id)}" ${String(category.id) === String(product.category_id || "") ? "selected" : ""}>${escapeHtml(valueOf(category, state.lang === "ar" ? ["name_ar", "name"] : ["name", "name_ar"], category.id))}</option>`).join(""); return `<form id="productForm" data-id="${escapeHtml(product.id || "")}"><div class="form-grid"><div class="field"><label>${t("arabicName")} *</label><input class="field-control" name="name_ar" required value="${escapeHtml(product.name_ar)}" /></div><div class="field"><label>${t("englishName")} *</label><input class="field-control" name="name" required value="${escapeHtml(product.name)}" /></div><div class="field full"><label>${t("arabicDescription")}</label><textarea name="description_ar">${escapeHtml(product.description_ar)}</textarea></div><div class="field"><label>${t("category")}</label><select class="field-control" name="category_id"><option value="">${t("unknown")}</option>${categoryOptions}</select></div><div class="field"><label>${t("originalPrice")}</label><input class="field-control" name="price" type="number" min="0" step="0.01" value="${escapeHtml(product.price)}" /></div><div class="field"><label>${t("salePrice")}</label><input class="field-control" name="sale_price" type="number" min="0" step="0.01" value="${escapeHtml(product.sale_price)}" /></div><div class="field"><label>${t("costPrice")}</label><input class="field-control" name="cost_price" type="number" min="0" step="0.01" value="${escapeHtml(product.cost_price)}" /></div><div class="field"><label>${t("sku")}</label><input class="field-control" name="sku" value="${escapeHtml(product.sku)}" /></div><div class="field"><label>${t("stock")}</label><input class="field-control" name="stock" type="number" min="0" value="${escapeHtml(product.stock)}" /></div><div class="field"><label>${t("threshold")}</label><input class="field-control" name="low_stock_threshold" type="number" min="0" value="${escapeHtml(valueOf(product, ["low_stock_threshold"], 5))}" /></div><div class="field"><label>${t("weight")}</label><input class="field-control" name="weight" type="number" min="0" step="0.01" value="${escapeHtml(product.weight)}" /></div><div class="field"><label>${t("status")}</label><select class="field-control" name="is_active"><option value="true" ${product.is_active !== false ? "selected" : ""}>${t("active")}</option><option value="false" ${product.is_active === false ? "selected" : ""}>${t("inactive")}</option></select></div><div class="field full image-field"><label>${state.lang === "ar" ? "صور المنتج" : "Product images"}</label><div class="image-upload"><label class="upload-dropzone" for="productImages">${icon("upload-cloud")}<strong>${state.lang === "ar" ? "اختر صور المنتج" : "Choose product images"}</strong><span>${state.lang === "ar" ? "PNG أو JPG حتى 5 صور، بحد أقصى 5MB للصورة" : "PNG or JPG, up to 5 images and 5MB each"}</span></label><input id="productImages" name="product_images" type="file" accept="image/png,image/jpeg,image/webp" multiple hidden /><div class="image-preview-grid" data-image-preview>${imageUrl ? `<div class="image-preview"><img src="${escapeHtml(imageUrl)}" alt=""><span>${state.lang === "ar" ? "الصورة الحالية" : "Current image"}</span></div>` : `<span class="muted image-empty">${state.lang === "ar" ? "لم تتم إضافة صور بعد" : "No images added yet"}</span>`}</div></div></div><div class="field"><label>${t("featured")}</label><label class="checkbox-line"><input type="checkbox" name="is_featured" ${product.is_featured ? "checked" : ""} /> ${t("featured")}</label></div><div class="field"><label>${t("newProduct")}</label><label class="checkbox-line"><input type="checkbox" name="is_new" ${product.is_new ? "checked" : ""} /> ${t("newProduct")}</label></div><div class="field"><label>${t("freeShipping")}</label><label class="checkbox-line"><input type="checkbox" name="free_shipping" ${product.free_shipping ? "checked" : ""} /> ${t("freeShipping")}</label></div></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`; }
async function openProductForm(id = "") { let product = {}; const categoriesResult = await getAll("categories", { order: "sort_order", ascending: true, limit: 200 }); const categories = categoriesResult.data || []; if (id) { const result = await db.from("products").select("*").eq("id", id).maybeSingle(); if (result.error) return toast(t("operationFailed"), result.error.message, "error"); product = result.data || {}; const images = await loadProductImages([id]); product.image_urls = (images.get(id) || []).map((image) => normalizeProductImageUrl(image)); } openModal(id ? t("edit") : t("addProduct"), productForm(product, categories), "CATALOG / PRODUCT"); }

async function renderCategories() {
  setHTML($("#content"), loadingMarkup());
  const result = await queryRows("categories", { page: state.currentPage, search: state.search, searchColumns: ["name", "name_ar", "description"], order: "sort_order", ascending: true });
  if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; }
  const rows = result.data;
  const body = rows.length ? `<table>${tableHeader([{ label: t("category") }, { label: t("description") }, { label: t("parentCategory") }, { label: t("sortOrder") }, { label: t("status") }, { label: t("actions") }])}<tbody>${rows.map((c) => {
    const categoryImage = normalizeProductImageUrl(valueOf(c, ["image_url"], ""));
    const thumb = categoryImage
      ? `<img class="product-thumb" src="${escapeHtml(categoryImage)}" alt="${escapeHtml(valueOf(c, state.lang === "ar" ? ["name_ar", "name"] : ["name", "name_ar"]))}" loading="lazy" />`
      : `<span class="product-thumb">${icon("folder")}</span>`;
    return `<tr><td><div class="product-cell">${thumb}<span><strong>${escapeHtml(valueOf(c, state.lang === "ar" ? ["name_ar", "name"] : ["name", "name_ar"]))}</strong><span>${escapeHtml(valueOf(c, state.lang === "ar" ? ["name", "name_ar"] : ["name_ar", "name"], ""))}</span></span></div></td><td>${escapeHtml(valueOf(c, ["description"], "—"))}</td><td>${escapeHtml(valueOf(c, ["parent_id"], "—"))}</td><td>${integer(c.sort_order)}</td><td><span class="status ${c.is_active === false ? "status-danger" : "status-success"}">${c.is_active === false ? t("inactive") : t("active")}</span></td><td><span class="row-actions"><button class="row-action" data-action="edit-category" data-id="${escapeHtml(c.id)}" title="${t("edit")}">${icon("pencil")}</button><button class="row-action" data-action="delete-category" data-id="${escapeHtml(c.id)}" title="${t("delete")}">${icon("trash-2")}</button></span></td></tr>`;
  }).join("")}</tbody></table>` : emptyMarkup();
  setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.categories.eyebrow}</span><h2>${t("categories")}</h2><p>${state.lang === "ar" ? "هيكل التصنيفات المستخدم في الكتالوج." : "The category structure used by your catalog."}</p></div></div>${tableShell(toolbar(t("category"), "add-category", t("addCategory")), body, pagination(result.count, state.currentPage))}`);
}

function categoryForm(category = {}) {
  const imageUrl = normalizeProductImageUrl(valueOf(category, ["image_url"], ""));
  const parentField = category.id ? `<div class="field"><label>${t("parentCategory")}</label><input class="field-control" name="parent_id" value="${escapeHtml(category.parent_id)}" /></div>` : "";
  const imagePreview = imageUrl
    ? `<div class="image-preview"><img src="${escapeHtml(imageUrl)}" alt=""><span>${state.lang === "ar" ? "الصورة الحالية" : "Current image"}</span></div>`
    : `<span class="muted image-empty">${state.lang === "ar" ? "لم تتم إضافة صورة بعد" : "No image added yet"}</span>`;
  return `<form id="categoryForm" data-id="${escapeHtml(category.id || "")}"><div class="form-grid"><div class="field"><label>${t("arabicName")} *</label><input class="field-control" name="name_ar" required value="${escapeHtml(category.name_ar)}" /></div><div class="field"><label>${t("englishName")} *</label><input class="field-control" name="name" required value="${escapeHtml(category.name)}" /></div><div class="field full"><label>${t("description")}</label><textarea name="description">${escapeHtml(category.description)}</textarea></div>${parentField}<div class="field"><label>${t("sortOrder")}</label><input class="field-control" name="sort_order" type="number" value="${escapeHtml(category.sort_order)}" /></div><div class="field"><label>${t("status")}</label><select class="field-control" name="is_active"><option value="true" ${category.is_active !== false ? "selected" : ""}>${t("active")}</option><option value="false" ${category.is_active === false ? "selected" : ""}>${t("inactive")}</option></select></div><div class="field full image-field"><label>${state.lang === "ar" ? "صورة التصنيف" : "Category image"}</label><div class="image-upload"><label class="upload-dropzone" for="categoryImage">${icon("upload-cloud")}<strong>${state.lang === "ar" ? "اختر صورة للتصنيف" : "Choose a category image"}</strong><span>${state.lang === "ar" ? "PNG أو JPG أو WEBP، بحد أقصى 5MB" : "PNG, JPG or WEBP, up to 5MB"}</span></label><input id="categoryImage" name="category_image" type="file" accept="image/png,image/jpeg,image/webp" hidden /><div class="image-preview-grid category-image-preview-grid" data-image-preview>${imagePreview}</div></div></div></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`;
}

async function openCategoryForm(id = "") {
  let category = {};
  if (id) {
    const result = await db.from("categories").select("*").eq("id", id).maybeSingle();
    if (result.error) return toast(t("operationFailed"), result.error.message, "error");
    category = result.data || {};
  }
  openModal(id ? t("edit") : t("addCategory"), categoryForm(category), "CATALOG / CATEGORY");
}
async function renderOrders() { setHTML($("#content"), loadingMarkup()); const searchTerm = state.search.trim(); const result = await queryRows("orders", { page: state.currentPage, search: searchTerm, searchColumns: ["customer_name", "customer_email", "customer_phone", "shipping_address", "governorate", "city", "payment_method", "payment_status", "status"], order: "created_at" }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } let rows = result.data || []; if (searchTerm) { const exactMatches = []; const idResult = await db.from("orders").select("*").eq("id", searchTerm).maybeSingle(); if (!idResult.error && idResult.data) exactMatches.push(idResult.data); if (/^\d+$/.test(searchTerm)) { const numberResult = await db.from("orders").select("*").eq("order_number", Number(searchTerm)).maybeSingle(); if (!numberResult.error && numberResult.data) exactMatches.push(numberResult.data); } exactMatches.reverse().forEach((order) => { if (!rows.some((row) => String(row.id) === String(order.id))) rows = [order, ...rows]; }); } const body = rows.length ? `<table>${tableHeader([{ label: "ID" }, { label: t("orderNumber") }, { label: t("customer") }, { label: t("phone") }, { label: t("governorate") }, { label: t("total") }, { label: t("paymentStatus") }, { label: t("orderStatus") }, { label: t("createdAt") }, { label: t("actions") }])}<tbody>${rows.map((o) => `<tr><td><code>${escapeHtml(o.id)}</code></td><td><strong>${escapeHtml(valueOf(o, ["order_number", "id"]))}</strong></td><td>${escapeHtml(valueOf(o, ["customer_name", "customer_email"], "—"))}</td><td>${escapeHtml(valueOf(o, ["customer_phone"], "—"))}</td><td>${escapeHtml(valueOf(o, ["governorate", "city"], "—"))}</td><td><strong>${money(orderTotal(o))}</strong></td><td><span class="status ${statusClass(o.payment_status)}">${escapeHtml(statusLabel(o.payment_status))}</span></td><td><span class="status ${statusClass(o.status)}">${escapeHtml(statusLabel(o.status))}</span></td><td>${shortDate(o.created_at)}</td><td><span class="row-actions"><button class="row-action" data-action="show-order" data-id="${escapeHtml(o.id)}" title="${t("view")}">${icon("eye")}</button><button class="row-action" data-action="change-order-status" data-id="${escapeHtml(o.id)}" title="${t("changeStatus")}">${icon("repeat-2")}</button><button class="row-action" data-action="edit-order" data-id="${escapeHtml(o.id)}" title="${t("edit")}">${icon("pencil")}</button><button class="row-action danger" data-action="delete-order" data-id="${escapeHtml(o.id)}" title="${t("delete")}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup(); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.orders.eyebrow}</span><h2>${t("orders")}</h2><p>${state.lang === "ar" ? "تابع الحالة، الدفع، والشحن من مصدر واحد." : "Follow status, payment and fulfillment in one place."}</p></div></div>${tableShell(toolbar(t("orderNumber")), body, pagination(result.count, state.currentPage))}`); }
async function openOrderDetails(id) { const [orderResult, itemsResult, historyResult] = await Promise.all([db.from("orders").select("*").eq("id", id).maybeSingle(), db.from("order_items").select("*").eq("order_id", id).order("id", { ascending: true }), db.from("order_status_history").select("*").eq("order_id", id).order("created_at", { ascending: false })]); if (orderResult.error) return toast(t("operationFailed"), orderResult.error.message, "error"); const order = orderResult.data || {}; const items = itemsResult.data || []; const history = historyResult.data || []; openDrawer(t("orderDetails"), `<div class="detail-grid"><div class="detail-card"><span>ID</span><strong><code>${escapeHtml(order.id)}</code></strong></div><div class="detail-card"><span>${t("orderNumber")}</span><strong>${escapeHtml(valueOf(order, ["order_number", "id"]))}</strong></div><div class="detail-card"><span>${t("createdAt")}</span><strong>${dateText(order.created_at)}</strong></div><div class="detail-card"><span>${t("customer")}</span><strong>${escapeHtml(valueOf(order, ["customer_name", "customer_email"]))}</strong></div><div class="detail-card"><span>${t("phone")}</span><strong>${escapeHtml(order.customer_phone)}</strong></div><div class="detail-card detail-full"><span>${t("address")}</span><strong>${escapeHtml([order.shipping_address, order.city, order.governorate].filter(Boolean).join(" · ") || "—")}</strong></div><div class="detail-card"><span>${t("paymentMethod")}</span><strong>${escapeHtml(order.payment_method || "—")}</strong></div><div class="detail-card"><span>${t("paymentStatus")}</span><strong>${escapeHtml(statusLabel(order.payment_status))}</strong></div><div class="detail-card"><span>${t("total")}</span><strong>${money(orderTotal(order))}</strong></div></div><div class="panel" style="margin-top:18px"><div class="panel-header"><div class="panel-title"><h3>${t("products")}</h3></div></div><div class="panel-body">${items.length ? `<div class="list-stack">${items.map((item) => `<div class="list-item"><span class="list-icon">${icon("package")}</span><span class="list-copy"><strong>${escapeHtml(valueOf(item, ["product_name", "product_sku", "product_id"]))}</strong><span>${t("quantity")}: ${integer(item.quantity)} · ${money(valueOf(item, ["price", "unit_price"]))}</span></span><strong class="list-value">${money(num(valueOf(item, ["total"])) || num(valueOf(item, ["price", "unit_price"])) * num(item.quantity))}</strong></div>`).join("")}</div>` : emptyMarkup()}</div></div><div class="panel" style="margin-top:18px"><div class="panel-header"><div class="panel-title"><h3>${t("statusHistory")}</h3></div></div><div class="panel-body">${history.length ? `<div class="list-stack">${history.map((h) => `<div class="list-item"><span class="list-icon">${icon("history")}</span><span class="list-copy"><strong>${escapeHtml(statusLabel(valueOf(h, ["status", "new_status"])))}</strong><span>${dateText(h.created_at)} · ${escapeHtml(valueOf(h, ["note", "changed_by"], ""))}</span></span></div>`).join("")}</div>` : emptyMarkup()}</div></div><div class="form-footer"><button class="btn" data-action="print-order" data-id="${escapeHtml(id)}">${icon("printer")} ${t("printInvoice")}</button><button class="btn btn-primary" data-action="change-order-status" data-id="${escapeHtml(id)}">${icon("repeat-2")} ${t("changeStatus")}</button></div>`); }
function orderEditForm(o = {}) { const f = (name, label, type = "text") => `<div class="field"><label>${escapeHtml(label)}</label><input class="field-control" type="${type}" name="${name}" value="${escapeHtml(o[name] ?? "")}"></div>`; const payOpts = ["pending", "paid", "failed", "refunded"]; return `<form id="orderEditForm" data-id="${escapeHtml(o.id)}"><div class="form-grid">${f("customer_name", t("customer"))}${f("customer_phone", t("phone"), "tel")}${f("customer_email", "Email", "email")}${f("governorate", t("governorate"))}${f("city", state.lang === "ar" ? "المدينة" : "City")}${f("payment_method", t("paymentMethod"))}<div class="field"><label>${t("paymentStatus")}</label><select class="field-control" name="payment_status">${payOpts.map((s) => `<option value="${s}" ${String(o.payment_status) === s ? "selected" : ""}>${statusLabel(s)}</option>`).join("")}</select></div>${f("total", t("total"), "number")}</div><div class="field" style="margin-top:12px"><label>${t("address")}</label><textarea name="shipping_address">${escapeHtml(o.shipping_address || "")}</textarea></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`; }
function statusForm(id) { return `<form id="orderStatusForm" data-id="${escapeHtml(id)}"><div class="field"><label>${t("orderStatus")}</label><select class="field-control" name="status">${["new", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"].map((s) => `<option value="${s}">${statusLabel(s)}</option>`).join("")}</select></div><div class="field" style="margin-top:12px"><label>${t("reason")}</label><textarea name="note" placeholder="${state.lang === "ar" ? "ملاحظة اختيارية لسجل الحالة" : "Optional note for the history"}"></textarea></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`; }

async function renderCustomers() { setHTML($("#content"), loadingMarkup()); const [profilesRes, ordersRes] = await Promise.all([getAll("profiles", { order: "created_at", ascending: false, limit: 100 }), getAll("orders", { order: "created_at", ascending: false, limit: 300 })]); if (profilesRes.error) { setHTML($("#content"), errorMarkup(profilesRes.error.message)); return; } const rows = profilesRes.data.filter((row) => JSON.stringify(row).toLowerCase().includes(state.search.toLowerCase())); const body = rows.length ? `<table>${tableHeader([{ label: t("customer") }, { label: t("phone") }, { label: "Email" }, { label: t("orders") }, { label: t("total") }, { label: t("createdAt") }])}<tbody>${rows.map((c) => { const customerOrders = ordersRes.data.filter((o) => o.customer_id === c.id || o.user_id === c.id || (c.phone && o.customer_phone === c.phone)); return `<tr><td><div class="product-cell"><span class="avatar">${escapeHtml((valueOf(c, ["full_name", "name", "email"], "?")[0] || "?").toUpperCase())}</span><span><strong>${escapeHtml(valueOf(c, ["full_name", "name"], t("unknown")))}</strong><span>${escapeHtml(c.id)}</span></span></div></td><td>${escapeHtml(c.phone || "—")}</td><td>${escapeHtml(c.email || "—")}</td><td>${integer(customerOrders.length)}</td><td>${money(sum(customerOrders, ["total", "grand_total"]))}</td><td>${shortDate(c.created_at)}</td></tr>`; }).join("")}</tbody></table>` : emptyMarkup(); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.customers.eyebrow}</span><h2>${t("customers")}</h2><p>${state.lang === "ar" ? "ملخص العملاء المستخرج من profiles والطلبات." : "A summary built from profiles and orders."}</p></div></div>${tableShell(toolbar(t("customer")), body, pagination(rows.length, 1, rows.length || 1))}`); }

function inventoryMovementLabel(value) {
  const type = String(value || "").toLowerCase();
  if (type === "add" || type === "increase") return state.lang === "ar" ? "إضافة" : "Add";
  if (type === "subtract" || type === "decrease") return state.lang === "ar" ? "خصم" : "Subtract";
  return value || t("unknown");
}
function inventoryMovementClass(value) {
  return ["add", "increase"].includes(String(value || "").toLowerCase()) ? "status-success" : "status-danger";
}
function inventoryErrorMessage(error) {
  const message = String(error?.message || error || "");
  const lower = message.toLowerCase();
  if (lower.includes("insufficient") || lower.includes("not enough") || lower.includes("stock" ) && lower.includes("exceed")) return state.lang === "ar" ? "الكمية المطلوب خصمها أكبر من المخزون المتاح." : "The quantity to subtract is greater than the available stock.";
  if (lower.includes("row-level security") || lower.includes("permission") || lower.includes("not authorized")) return state.lang === "ar" ? "ليس لديك صلاحية تنفيذ حركة المخزون." : "You do not have permission to adjust inventory.";
  return message || (state.lang === "ar" ? "تعذر تنفيذ حركة المخزون." : "Could not adjust inventory.");
}
async function loadInventoryMovements(products) {
  const result = await getAll("inventory_movements", { order: "created_at", ascending: false, limit: 100 });
  if (result.error) return { rows: [], error: result.error };
  const productMap = new Map((products || []).map((product) => [String(product.id), product]));
  return { rows: (result.data || []).map((movement) => ({ ...movement, __product: productMap.get(String(valueOf(movement, ["product_id", "productId"], ""))) })) , error: null };
}
function inventoryMovementRows(rows) {
  if (!rows.length) return emptyMarkup(state.lang === "ar" ? "لا توجد حركات مخزون" : "No inventory movements", state.lang === "ar" ? "ستظهر الحركات هنا بعد تنفيذ أول عملية." : "Movements will appear here after the first adjustment.");
  return `<table><thead><tr>${[t("product"), state.lang === "ar" ? "نوع الحركة" : "Movement", t("quantity"), state.lang === "ar" ? "المخزون السابق" : "Previous stock", state.lang === "ar" ? "المخزون الجديد" : "New stock", t("reason"), t("createdAt")].map((label) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead><tbody>${rows.map((movement) => { const product = movement.__product; const type = valueOf(movement, ["movement_type", "type", "action"], ""); const quantity = valueOf(movement, ["quantity", "amount", "change_amount"], "—"); const previous = valueOf(movement, ["previous_stock", "stock_before", "old_stock", "before_quantity"], "—"); const next = valueOf(movement, ["new_stock", "stock_after", "new_quantity", "resulting_stock"], "—"); return `<tr><td>${escapeHtml(product ? productName(product) : valueOf(movement, ["product_name", "product_id"], "—"))}</td><td><span class="status ${inventoryMovementClass(type)}">${escapeHtml(inventoryMovementLabel(type))}</span></td><td>${escapeHtml(quantity)}</td><td>${escapeHtml(previous)}</td><td>${escapeHtml(next)}</td><td style="white-space:normal;max-width:240px">${escapeHtml(valueOf(movement, ["note", "reason", "description"], "—"))}</td><td>${dateText(valueOf(movement, ["created_at", "inserted_at", "createdAt"]))}</td></tr>`; }).join("")}</tbody></table>`;
}
async function renderInventory() {
  setHTML($("#content"), loadingMarkup());
  const result = await queryRows("products", { page: state.currentPage, search: state.search, searchColumns: ["name", "name_ar", "sku"], order: "stock", ascending: true });
  if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; }
  const rows = result.data || [];
  const low = rows.filter((p) => productStock(p) > 0 && productStock(p) <= num(valueOf(p, ["low_stock_threshold"], 5))).length;
  const out = rows.filter((p) => productStock(p) <= 0).length;
  const movementResult = await loadInventoryMovements(rows);
  const body = rows.length ? `<table>${tableHeader([{ label: t("product") }, { label: t("sku") }, { label: t("stock") }, { label: t("threshold") }, { label: t("status") }, { label: t("actions") }])}<tbody>${rows.map((p) => `<tr><td><div class="product-cell">${productImage(p)}<span><strong>${escapeHtml(productName(p))}</strong></span></div></td><td>${escapeHtml(valueOf(p, ["sku"], "—"))}</td><td data-stock-product="${escapeHtml(p.id)}"><strong>${integer(productStock(p))}</strong></td><td>${integer(valueOf(p, ["low_stock_threshold"], 5))}</td><td><span class="status ${productStock(p) <= 0 ? "status-danger" : productStock(p) <= num(valueOf(p, ["low_stock_threshold"], 5)) ? "status-warning" : "status-success"} ${productStock(p) <= 0 ? "" : ""}">${productStock(p) <= 0 ? t("outOfStock") : productStock(p) <= num(valueOf(p, ["low_stock_threshold"], 5)) ? t("lowStock") : t("active")}</span></td><td><button class="btn btn-sm" data-action="adjust-inventory" data-id="${escapeHtml(p.id)}">${icon("sliders-horizontal")} ${t("adjustStock")}</button></td></tr>`).join("")}</tbody></table>` : emptyMarkup();
  const movementPanel = movementResult.error ? errorMarkup(inventoryErrorMessage(movementResult.error)) : inventoryMovementRows(movementResult.rows);
  setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.inventory.eyebrow}</span><h2>${t("inventory")}</h2><p>${state.lang === "ar" ? "إدارة المخزون عبر دالة Supabase الآمنة مع سجل كامل للحركات." : "Manage stock through the secure Supabase RPC with a complete movement log."}</p></div></div><div class="metrics-grid">${metricCard(t("products"), integer(result.count), "boxes")}${metricCard(t("lowStock"), integer(low), "triangle-alert")}${metricCard(t("outOfStock"), integer(out), "package-x")}${metricCard(t("dataSource"), "RPC", "shield-check", "admin_adjust_inventory")}</div>${tableShell(toolbar(t("productName")), body, pagination(result.count, state.currentPage))}<section class="table-panel inventory-history-panel"><div class="panel-header"><div class="panel-title"><h3>${state.lang === "ar" ? "سجل حركات المخزون" : "Inventory movement history"}</h3><span>${state.lang === "ar" ? "المصدر: inventory_movements" : "Source: inventory_movements"}</span></div><button class="btn btn-sm" data-action="refresh">${icon("refresh-cw")} ${t("refresh")}</button></div><div class="table-scroll">${movementPanel}</div></section>`);
}
function inventoryForm(product) { const current = productStock(product); return `<form id="inventoryForm" data-id="${escapeHtml(product.id)}" data-current-stock="${escapeHtml(current)}"><div class="detail-card" style="margin-bottom:14px"><span>${t("product")}</span><strong>${escapeHtml(productName(product))}</strong><span>${state.lang === "ar" ? "الكمية الحالية" : "Current quantity"}: <b data-current-stock-label>${integer(current)}</b></span></div><div class="form-grid"><div class="field"><label>${state.lang === "ar" ? "نوع الحركة" : "Movement type"}</label><select class="field-control" name="movement_type" required><option value="add">${state.lang === "ar" ? "إضافة" : "Add"}</option><option value="subtract">${state.lang === "ar" ? "خصم" : "Subtract"}</option></select></div><div class="field"><label>${t("quantity")}</label><input class="field-control" name="quantity" type="number" min="1" step="1" inputmode="numeric" required /></div><div class="field full"><label>${state.lang === "ar" ? "ملاحظة اختيارية" : "Optional note"}</label><textarea name="note" placeholder="${state.lang === "ar" ? "اكتب سبب الحركة (اختياري)" : "Enter a reason (optional)"}"></textarea></div></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${state.lang === "ar" ? "تنفيذ الحركة" : "Execute movement"}</button></div></form>`; }

const genericConfig = {
  coupons: { table: "coupons", search: ["code"], columns: [["code", "couponCode"], ["discount_type", "discountType"], ["discount_value", "discountValue"], ["usage_limit", "usageLimit"], ["expires_at", "expiration"], ["is_active", "status"]], add: "add-coupon", addLabel: "addCoupon" },
  wishlist: { table: "wishlists", search: ["product_id", "user_id"], columns: [["user_id", "customer"], ["product_id", "product"], ["created_at", "createdAt"]] },
  banners: { table: "banners", search: ["title", "subtitle", "button_text"], columns: [["title", "productName"], ["subtitle", "description"], ["button_text", "buttonText"], ["button_link", "buttonLink"], ["sort_order", "sortOrder"], ["is_active", "status"]] },
  payments: { table: "payments", search: ["transaction_id", "payment_reference", "order_id"], columns: [["order_id", "order"], ["amount", "total"], ["payment_method", "paymentMethod"], ["transaction_id", "orderNumber"], ["payment_status", "paymentStatus"], ["paid_at", "createdAt"]] },
};
function cellValue(row, key) { const value = row[key]; if (key.includes("date") || key.endsWith("_at")) return shortDate(value); if (["amount", "total", "discount_value"].includes(key) && value !== undefined) return money(value); if (key === "is_active") return `<span class="status ${value === false ? "status-danger" : "status-success"}">${value === false ? t("inactive") : t("active")}</span>`; if (key === "payment_status" || key === "status") return `<span class="status ${statusClass(value)}">${escapeHtml(statusLabel(value))}</span>`; return escapeHtml(value ?? "—"); }
function bannerForm(banner = {}) { const imageUrl = normalizeProductImageUrl(valueOf(banner, ["image_url", "image"])); return `<form id="bannerForm" data-id="${escapeHtml(banner.id || "")}"><div class="form-grid"><div class="field"><label>${t("productName")} *</label><input class="field-control" name="title" required value="${escapeHtml(banner.title)}" /></div><div class="field"><label>${t("description")}</label><input class="field-control" name="subtitle" value="${escapeHtml(banner.subtitle)}" /></div><div class="field"><label>${state.lang === "ar" ? "نص الزر" : "Button text"}</label><input class="field-control" name="button_text" value="${escapeHtml(banner.button_text)}" /></div><div class="field"><label>${state.lang === "ar" ? "رابط الزر" : "Button link"}</label><input class="field-control" name="button_link" value="${escapeHtml(banner.button_link)}" /></div><div class="field"><label>${t("sortOrder")}</label><input class="field-control" name="sort_order" type="number" value="${escapeHtml(banner.sort_order ?? 0)}" /></div><div class="field"><label>${t("status")}</label><label class="checkbox-line"><input type="checkbox" name="is_active" ${banner.is_active !== false ? "checked" : ""} /> ${t("active")}</label></div><div class="field full image-field"><label>${state.lang === "ar" ? "صورة البانر" : "Banner image"}</label><div class="image-upload"><label class="upload-dropzone" for="bannerImage">${icon("upload-cloud")}<strong>${state.lang === "ar" ? "اختر صورة البانر" : "Choose banner image"}</strong><span>PNG أو JPG أو WEBP، بحد أقصى 5MB</span></label><input id="bannerImage" name="banner_image" type="file" accept="image/png,image/jpeg,image/webp" hidden /><div class="image-preview-grid category-image-preview-grid" data-image-preview>${imageUrl ? `<div class="image-preview"><img src="${escapeHtml(imageUrl)}" alt=""><span>${state.lang === "ar" ? "الصورة الحالية" : "Current image"}</span></div>` : `<span class="muted image-empty">${state.lang === "ar" ? "لم تتم إضافة صورة بعد" : "No image added yet"}</span>`}</div></div></div></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`; }
async function renderBanners() { setHTML($("#content"), loadingMarkup()); const result = await queryRows("banners", { page: state.currentPage, search: state.search, searchColumns: ["title", "subtitle", "button_text"], order: "sort_order", ascending: true }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } const rows = result.data || []; const body = rows.length ? `<table>${tableHeader([{ label: t("productName") }, { label: t("description") }, { label: state.lang === "ar" ? "الصورة" : "Image" }, { label: t("sortOrder") }, { label: t("status") }, { label: t("actions") }])}<tbody>${rows.map((b) => `<tr><td><strong>${escapeHtml(b.title)}</strong></td><td>${escapeHtml(b.subtitle || "—")}</td><td>${b.image_url ? `<img class="product-thumb" src="${escapeHtml(normalizeProductImageUrl(b.image_url))}" alt="" />` : "—"}</td><td>${integer(b.sort_order)}</td><td>${cellValue(b, "is_active")}</td><td><span class="row-actions"><button class="row-action" data-action="edit-banner" data-id="${escapeHtml(b.id)}" title="${t("edit")}">${icon("pencil")}</button><button class="row-action" data-action="delete-banner" data-id="${escapeHtml(b.id)}" title="${t("delete")}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup(); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.banners.eyebrow}</span><h2>${t("banners")}</h2><p>${t("dataSource")}</p></div></div>${tableShell(toolbar(t("search"), "add-banner", state.lang === "ar" ? "إضافة بانر" : "Add banner"), body, pagination(result.count, state.currentPage))}`); }
async function openBannerForm(id = "") { let banner = {}; if (id) { const result = await db.from("banners").select("*").eq("id", id).maybeSingle(); if (result.error) return toast(t("operationFailed"), result.error.message, "error"); banner = result.data || {}; } openModal(id ? t("edit") : (state.lang === "ar" ? "إضافة بانر" : "Add banner"), bannerForm(banner), "CONTENT / BANNER"); }

async function renderGeneric(page) { const config = genericConfig[page]; setHTML($("#content"), loadingMarkup()); const result = await queryRows(config.table, { page: state.currentPage, search: state.search, searchColumns: config.search, order: "created_at" }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } const rows = result.data; const body = rows.length ? `<table>${tableHeader(config.columns.map(([, label]) => ({ label: t(label) })))}<tbody>${rows.map((row) => `<tr>${config.columns.map(([key]) => `<td>${cellValue(row, key)}</td>`).join("")}${page === "coupons" ? `<td><span class="row-actions"><button class="row-action" data-action="delete-generic" data-table="coupons" data-id="${escapeHtml(row.id)}">${icon("trash-2")}</button></span></td>` : ""}</tr>`).join("")}</tbody></table>` : emptyMarkup(); const cols = config.columns.map(([, label]) => ({ label: t(label) })); if (page === "coupons") cols.push({ label: t("actions") }); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta[page].eyebrow}</span><h2>${pageMeta[page].title}</h2><p>${t("dataSource")}</p></div></div>${tableShell(toolbar(t("search"), config.add, t(config.addLabel || "add")), body, pagination(result.count, state.currentPage))}`); }
function couponForm() { return `<form id="couponForm"><div class="form-grid"><div class="field"><label>${t("couponCode")} *</label><input class="field-control" name="code" required /></div><div class="field"><label>${t("discountType")}</label><select class="field-control" name="discount_type"><option value="percentage">Percentage</option><option value="fixed">Fixed</option></select></div><div class="field"><label>${t("discountValue")}</label><input class="field-control" name="discount_value" type="number" min="0" step="0.01" required /></div><div class="field"><label>${t("usageLimit")}</label><input class="field-control" name="usage_limit" type="number" min="0" /></div><div class="field"><label>${t("expiration")}</label><input class="field-control" name="expires_at" type="datetime-local" /></div><div class="field"><label>${t("status")}</label><label class="checkbox-line"><input type="checkbox" name="is_active" checked /> ${t("active")}</label></div></div><div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div></form>`; }

async function renderReviews() { setHTML($("#content"), loadingMarkup()); const result = await queryRows("reviews", { page: state.currentPage, search: state.search, searchColumns: ["comment", "product_id", "user_id"], order: "created_at" }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } const rows = result.data; const body = rows.length ? `<table>${tableHeader([{ label: t("customer") }, { label: t("product") }, { label: "Rating" }, { label: t("description") }, { label: t("status") }, { label: t("createdAt") }, { label: t("actions") }])}<tbody>${rows.map((r) => `<tr><td>${escapeHtml(valueOf(r, ["user_name", "user_id"], "—"))}</td><td>${escapeHtml(valueOf(r, ["product_name", "product_id"], "—"))}</td><td><strong>${"★".repeat(Math.min(5, num(r.rating)))}${"☆".repeat(Math.max(0, 5 - num(r.rating)))}</strong></td><td style="max-width:280px;white-space:normal">${escapeHtml(r.comment || "—")}</td><td><span class="status ${r.is_approved ? "status-success" : "status-warning"}">${r.is_approved ? t("approve") : t("pending")}</span></td><td>${shortDate(r.created_at)}</td><td><span class="row-actions"><button class="row-action" data-action="review-approve" data-id="${escapeHtml(r.id)}">${icon("check")}</button><button class="row-action" data-action="review-reject" data-id="${escapeHtml(r.id)}">${icon("x")}</button><button class="row-action" data-action="delete-review" data-id="${escapeHtml(r.id)}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup(); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.reviews.eyebrow}</span><h2>${t("reviews")}</h2><p>${state.lang === "ar" ? "اعتماد التقييمات أو رفضها وفق حالة قاعدة البيانات." : "Approve or reject reviews through the database state."}</p></div></div>${tableShell(toolbar(t("description")), body, pagination(result.count, state.currentPage))}`); }
async function renderNotifications() { setHTML($("#content"), loadingMarkup()); const result = await queryRows("notifications", { page: state.currentPage, search: state.search, searchColumns: ["title", "message", "type"], order: "created_at" }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } const rows = result.data; const body = rows.length ? `<table>${tableHeader([{ label: t("status") }, { label: t("productName") }, { label: t("description") }, { label: "Type" }, { label: t("createdAt") }, { label: t("actions") }])}<tbody>${rows.map((n) => `<tr><td><span class="status ${n.is_read ? "status-neutral" : "status-warning"}">${n.is_read ? (state.lang === "ar" ? "مقروء" : "Read") : (state.lang === "ar" ? "جديد" : "New")}</span></td><td>${escapeHtml(n.title || "—")}</td><td style="max-width:340px;white-space:normal">${escapeHtml(n.message || "—")}</td><td>${escapeHtml(n.type || "—")}</td><td>${dateText(n.created_at)}</td><td><span class="row-actions"><button class="row-action" data-action="mark-notification" data-id="${escapeHtml(n.id)}">${icon("mail-open")}</button><button class="row-action" data-action="delete-notification" data-id="${escapeHtml(n.id)}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup(); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.notifications.eyebrow}</span><h2>${t("notifications")}</h2><p>${state.lang === "ar" ? "تنبيهات الطلبات والمخزون والتقييمات." : "Order, inventory and review alerts."}</p></div><div class="action-row"><button class="btn" data-action="mark-all-notifications">${icon("mail-check")} ${t("markAllRead")}</button></div></div>${tableShell(toolbar(t("search")), body, pagination(result.count, state.currentPage))}`); }

async function renderAnalytics() { setHTML($("#content"), loadingMarkup()); const [ordersRes, itemsRes, productsRes] = await Promise.all([getAll("orders", { order: "created_at", ascending: false, limit: 500 }), getAll("order_items", { order: "created_at", ascending: false, limit: 1000 }), getAll("products", { order: "created_at", ascending: false, limit: 500 })]); if (ordersRes.error) { setHTML($("#content"), errorMarkup(ordersRes.error.message)); return; } const orders = ordersRes.data, items = itemsRes.data, products = productsRes.data; const delivered = orders.filter((o) => String(o.status || "").toLowerCase() === "delivered"); const revenue = sum(delivered, ["total", "grand_total"]); const profit = delivered.reduce((total, order) => total + items.filter((i) => i.order_id === order.id).reduce((p, i) => p + (num(valueOf(i, ["price", "unit_price"])) - num(i.cost_price)) * num(i.quantity), 0), 0); const byGovernorate = Object.entries(orders.reduce((map, order) => { const key = order.governorate || t("unknown"); map[key] = (map[key] || 0) + orderTotal(order); return map; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8); const best = Object.entries(items.reduce((map, item) => { const key = valueOf(item, ["product_name", "product_sku", "product_id"], t("unknown")); map[key] = (map[key] || 0) + num(item.quantity); return map; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8); const reportRows = byGovernorate.map(([name, total]) => ({ governorate: name, revenue: total })); window.__analyticsRows = reportRows; setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.analytics.eyebrow}</span><h2>${t("analytics")}</h2><p>${t("dataSource")}</p></div><div class="action-row"><button class="btn" data-action="export-analytics">${icon("download")} ${t("export")}</button><button class="btn" data-action="print-report">${icon("printer")} ${state.lang === "ar" ? "طباعة التقرير" : "Print report"}</button></div></div><div class="metrics-grid">${metricCard(t("revenue"), money(revenue), "banknote", "Delivered only")}${metricCard(t("estimatedProfit"), money(profit), "sparkles", "cost_price aware")}${metricCard(t("orders"), integer(orders.length), "receipt-text")}${metricCard(t("avgOrder"), money(delivered.length ? revenue / delivered.length : 0), "calculator")}</div><div class="panel-grid"><div>${panel(state.lang === "ar" ? "المبيعات حسب المحافظة" : "Sales by governorate", t("dataSource"), byGovernorate.length ? `<div class="list-stack">${byGovernorate.map(([name, total]) => `<div class="list-item"><span class="list-icon">${icon("map-pin")}</span><span class="list-copy"><strong>${escapeHtml(name)}</strong><span>${money(total)}</span></span><strong class="list-value">${money(total)}</strong></div>`).join("")}</div>` : emptyMarkup())}</div>${panel(t("bestProducts"), t("dataSource"), best.length ? `<div class="list-stack">${best.map(([name, qty]) => `<div class="list-item"><span class="list-icon">${icon("trophy")}</span><span class="list-copy"><strong>${escapeHtml(name)}</strong><span>${integer(qty)} ${t("sold")}</span></span><strong class="list-value">${integer(qty)}</strong></div>`).join("")}</div>` : emptyMarkup())}</div></div><div class="table-panel"><div class="panel-header"><div class="panel-title"><h3>${state.lang === "ar" ? "قابل للتصدير" : "Exportable breakdown"}</h3><span>${t("dataSource")}</span></div></div><div class="table-scroll"><table>${tableHeader([{ label: t("governorate") }, { label: t("revenue") }])}<tbody>${reportRows.length ? reportRows.map((r) => `<tr><td>${escapeHtml(r.governorate)}</td><td>${money(r.revenue)}</td></tr>`).join("") : `<tr><td colspan="2">${emptyMarkup()}</td></tr>`}</tbody></table></div></div>`); }

function shippingPrice(row) { return num(valueOf(row, ["shipping_cost", "shipping_price", "price", "cost"], 0)); }
function shippingZoneForm(zone = {}) {
  const active = zone.is_active !== false;
  return `<form id="shippingZoneForm" data-id="${escapeHtml(zone.id || "")}">
    <div class="form-grid">
      <div class="field full"><label>${t("shippingZoneName")} *</label><input class="field-control" name="name" required maxlength="120" value="${escapeHtml(zone.name)}" /></div>
      <div class="field"><label>${t("shippingPrice")} (EGP) *</label><input class="field-control" name="shipping_cost" type="number" min="0" step="0.01" inputmode="decimal" required value="${escapeHtml(shippingPrice(zone))}" /></div>
      <div class="field"><label>${t("status")}</label><label class="checkbox-line"><input type="checkbox" name="is_active" ${active ? "checked" : ""} /> ${t("enabled")}</label></div>
    </div>
    <p class="section-note">${t("shippingSchemaHint")}</p>
    <div class="form-footer"><button type="button" class="btn" data-action="close-modal">${t("cancel")}</button><button class="btn btn-primary" data-submit type="submit">${icon("save")} ${t("save")}</button></div>
  </form>`;
}
async function openShippingZoneForm(id = "") {
  let zone = {};
  if (id) { const result = await db.from("shipping_zones").select("*").eq("id", id).maybeSingle(); if (result.error) return toast(t("operationFailed"), result.error.message, "error"); zone = result.data || {}; }
  openModal(id ? t("edit") : t("addShippingZone"), shippingZoneForm(zone), "OPERATIONS / SHIPPING ZONES");
}
async function renderShipping() {
  setHTML($("#content"), loadingMarkup());
  const result = await getAll("shipping_zones", { order: "created_at", ascending: false, limit: 500 });
  if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; }
  const status = new URLSearchParams(location.search).get("shippingStatus") || "all";
  const sort = state.shippingSort || "name";
  const search = state.search.trim().toLocaleLowerCase();
  let rows = (result.data || []).filter((row) => !search || String(row.name || "").toLocaleLowerCase().includes(search));
  if (status === "active") rows = rows.filter((row) => row.is_active !== false);
  if (status === "inactive") rows = rows.filter((row) => row.is_active === false);
  rows.sort((a, b) => sort === "price-asc" ? shippingPrice(a) - shippingPrice(b) : sort === "price-desc" ? shippingPrice(b) - shippingPrice(a) : String(a.name || "").localeCompare(String(b.name || ""), "ar"));
  const body = rows.length ? `<table><thead><tr>${[t("shippingZoneName"), t("shippingPrice"), t("status"), t("createdAt"), t("actions")].map((label) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead><tbody>${rows.map((zone) => `<tr><td><strong>${escapeHtml(zone.name || "—")}</strong></td><td><strong>${money(shippingPrice(zone))}</strong></td><td><span class="status ${zone.is_active === false ? "status-danger" : "status-success"}">${zone.is_active === false ? t("disabled") : t("enabled")}</span></td><td>${shortDate(zone.created_at)}</td><td><span class="row-actions"><button class="row-action" data-action="edit-shipping-zone" data-id="${escapeHtml(zone.id)}" title="${t("edit")}">${icon("pencil")}</button><button class="row-action" data-action="delete-shipping-zone" data-id="${escapeHtml(zone.id)}" title="${t("delete")}">${icon("trash-2")}</button></span></td></tr>`).join("")}</tbody></table>` : emptyMarkup(state.lang === "ar" ? "لا توجد محافظات مطابقة" : "No matching governorates");
  const extra = `<select class="select-control" data-shipping-status><option value="all" ${status === "all" ? "selected" : ""}>${t("allStatuses")}</option><option value="active" ${status === "active" ? "selected" : ""}>${t("enabled")}</option><option value="inactive" ${status === "inactive" ? "selected" : ""}>${t("disabled")}</option></select><select class="select-control" data-shipping-sort><option value="name" ${sort === "name" ? "selected" : ""}>${t("sortByName")}</option><option value="price-asc" ${sort === "price-asc" ? "selected" : ""}>${t("sortByPriceAsc")}</option><option value="price-desc" ${sort === "price-desc" ? "selected" : ""}>${t("sortByPriceDesc")}</option></select>`;
  setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.shipping.eyebrow}</span><h2>${pageMeta.shipping.title}</h2><p>${t("shippingSchemaHint")}</p></div></div>${tableShell(toolbar(t("shippingZoneName"), "add-shipping-zone", t("addShippingZone"), extra), body, `<div class="pagination"><span>${integer(rows.length)} ${t("records")}</span></div>`)}`);
}
async function renderSettings() { setHTML($("#content"), loadingMarkup()); const result = await getAll("store_settings", { order: "created_at", ascending: false, limit: 100 }); if (result.error) { setHTML($("#content"), errorMarkup(result.error.message)); return; } const rows = result.data; const keys = rows.flatMap((row) => Object.keys(row)).filter((key, index, all) => !["id", "created_at", "updated_at"].includes(key) && all.indexOf(key) === index); setHTML($("#content"), `<div class="hero-row"><div><span class="eyebrow">${pageMeta.settings.eyebrow}</span><h2>${t("settings")}</h2><p>${t("settingsReadOnly")}</p></div><button class="btn" data-action="refresh">${icon("refresh-cw")} ${t("refresh")}</button></div><div class="panel-grid"><div>${panel(state.lang === "ar" ? "معلومات المتجر" : "Store information", t("dataSource"), rows.length ? `<div class="detail-grid">${keys.map((key) => `<div class="detail-card"><span>${escapeHtml(key)}</span><strong>${escapeHtml(valueOf(rows[0], [key], "—"))}</strong></div>`).join("")}</div>` : emptyMarkup(t("noData"), t("settingsReadOnly")))}</div>${panel(state.lang === "ar" ? "حالة التخزين" : "Storage state", "Supabase / store_settings", `<div class="list-stack"><div class="list-item"><span class="list-icon">${icon("database")}</span><span class="list-copy"><strong>${t("dataSource")}</strong><span>${integer(rows.length)} ${t("records")}</span></span><span class="status status-success">LIVE</span></div><div class="list-item"><span class="list-icon">${icon("shield-check")}</span><span class="list-copy"><strong>${t("readOnly")}</strong><span>${t("settingsReadOnly")}</span></span></div></div>`)}</div>`); }

async function renderPage() { state.currentPage = state.currentPage || 1; setPageChrome(); switch (state.page) { case "dashboard": return renderDashboard(); case "products": return renderProducts(); case "categories": return renderCategories(); case "orders": return renderOrders(); case "customers": return renderCustomers(); case "inventory": return renderInventory(); case "shipping": return renderShipping(); case "banners": return renderBanners(); case "reviews": return renderReviews(); case "notifications": return renderNotifications(); case "analytics": return renderAnalytics(); case "settings": return renderSettings(); default: return renderGeneric(state.page); } }

function formDataObject(form) { return Object.fromEntries(new FormData(form).entries()); }
function typedPayload(form, keys) { const data = formDataObject(form); const payload = {}; keys.forEach((key) => { const field = form.elements[key]; if (!field) return; if (field.type === "checkbox") payload[key] = field.checked; else if (field.value !== "") payload[key] = field.type === "number" ? Number(field.value) : field.value; }); return payload; }
async function handleSubmit(event) {
  const form = event.target; if (!(form instanceof HTMLFormElement)) return;
  if (!["productForm", "categoryForm", "orderStatusForm", "orderEditForm", "inventoryForm", "couponForm", "bannerForm", "shippingZoneForm", "shippingZoneForm", "shippingZoneForm", "shippingZoneForm"].includes(form.id)) return;
  event.preventDefault();
  if (form.id === "productForm") {
    const id = form.dataset.id;
    const payload = typedPayload(form, ["name_ar", "name", "description_ar", "price", "sale_price", "cost_price", "sku", "stock", "low_stock_threshold", "weight", "category_id", "is_active", "is_featured", "is_new", "free_shipping"]);
    const ok = await runWrite(async () => {
      let productId = id;
      let result;
      if (id) result = await db.from("products").update(payload).eq("id", id).select().maybeSingle();
      else result = await db.from("products").insert(payload).select().single();
      if (result.error) throw result.error;
      productId = result.data?.id || productId;
      const files = [...(form.elements.product_images?.files || [])].slice(0, 5);
      if (files.length && productId) {
        const uploadedUrls = await uploadProductImages(files, productId);
        if (uploadedUrls.length) {
          const imageUpdate = await db.from("products").update({ image_url: uploadedUrls[0] }).eq("id", productId);
          if (imageUpdate.error) console.warn("image_url update skipped:", imageUpdate.error.message);
          await saveProductImageRecords(productId, uploadedUrls);
        }
      }
      closeModal(); toast(t("operationSuccess"), t("products"), "success"); await renderPage();
    });
    return ok;
  }
  if (form.id === "categoryForm") {
    const existingId = form.dataset.id;
    const payloadKeys = ["name_ar", "name", "description", "sort_order", "is_active"];
    if (form.elements.parent_id) payloadKeys.push("parent_id");
    const payload = typedPayload(form, payloadKeys);
    const imageFile = form.elements.category_image?.files?.[0];
    if (imageFile && (!imageFile.type.startsWith("image/") || imageFile.size > 5 * 1024 * 1024)) {
      toast(t("operationFailed"), state.lang === "ar" ? "يرجى اختيار صورة أقل من 5MB." : "Please choose an image smaller than 5MB.", "error");
      return false;
    }
    const ok = await runWrite(async () => {
      let categoryId = existingId;
      if (categoryId) {
        const result = await db.from("categories").update(payload).eq("id", categoryId).select("id").maybeSingle();
        if (result.error) throw result.error;
        if (!result.data) throw new Error(state.lang === "ar" ? "لم يتم العثور على التصنيف أو لا توجد صلاحية لتعديله." : "Category not found or update permission denied.");
      } else {
        const result = await db.from("categories").insert(payload).select("id").single();
        if (result.error) throw result.error;
        categoryId = result.data.id;
        form.dataset.id = categoryId;
      }
      if (imageFile && categoryId) {
        const imageUrl = await uploadCategoryImage(imageFile, categoryId);
        const imageUpdate = await db.from("categories").update({ image_url: imageUrl }).eq("id", categoryId).select("id").maybeSingle();
        if (imageUpdate.error) throw imageUpdate.error;
        if (!imageUpdate.data) throw new Error(state.lang === "ar" ? "تم رفع الصورة لكن تعذر ربطها بالتصنيف." : "The image uploaded but could not be attached to the category.");
      }
      closeModal();
      toast(t("operationSuccess"), t("categories"), "success");
      await renderPage();
    });
    return ok;
  }
  if (form.id === "bannerForm") { const payload = typedPayload(form, ["title", "subtitle", "button_text", "button_link", "sort_order", "is_active"]); const imageFile = form.elements.banner_image?.files?.[0]; const ok = await runWrite(async () => { let bannerId = form.dataset.id; let result = bannerId ? await db.from("banners").update(payload).eq("id", bannerId).select("id").maybeSingle() : await db.from("banners").insert(payload).select("id").single(); if (result.error) throw result.error; bannerId = result.data?.id || bannerId; if (imageFile && bannerId) { const imageUrl = await uploadBannerImage(imageFile, bannerId); const imageUpdate = await db.from("banners").update({ image_url: imageUrl }).eq("id", bannerId); if (imageUpdate.error) throw imageUpdate.error; } closeModal(); toast(t("operationSuccess"), t("banners"), "success"); await renderPage(); }); return ok; }
  if (form.id === "orderEditForm") { const data = formDataObject(form); const allowed = ["customer_name", "customer_phone", "customer_email", "governorate", "city", "payment_method", "payment_status", "total", "shipping_address"]; const payload = {}; allowed.forEach((k) => { if (k in data) payload[k] = k === "total" ? (data[k] === "" ? null : Number(data[k])) : (data[k] === "" ? null : data[k]); }); const ok = await runWrite(async () => { const result = await db.from("orders").update(payload).eq("id", form.dataset.id).select(); if (result.error) throw result.error; if (!result.data?.length) throw new Error(state.lang === "ar" ? "لم يتم حفظ التعديل، تأكد من صلاحيات التعديل على جدول الطلبات." : "Nothing was saved. Check update permissions on the orders table."); closeModal(); closeDrawer(); toast(t("operationSuccess"), t("orders"), "success"); await renderPage(); }); return ok; }
  if (form.id === "orderStatusForm") { const data = formDataObject(form); const ok = await runWrite(async () => { await callRpc("admin_update_order_status", { p_order_id: form.dataset.id, p_status: data.status, p_note: data.note || null }); closeModal(); closeDrawer(); toast(t("operationSuccess"), t("orders"), "success"); await renderPage(); }); return ok; }
  if (form.id === "inventoryForm") {
    const data = formDataObject(form);
    const quantity = Number(data.quantity);
    const movementType = String(data.movement_type || "");
    if (!Number.isInteger(quantity) || quantity <= 0) { toast(state.lang === "ar" ? "كمية غير صالحة" : "Invalid quantity", state.lang === "ar" ? "أدخل كمية صحيحة أكبر من صفر." : "Enter a whole number greater than zero.", "error"); return false; }
    if (!["add", "subtract"].includes(movementType)) { toast(t("operationFailed"), state.lang === "ar" ? "نوع الحركة غير صالح." : "Invalid movement type.", "error"); return false; }
    if (movementType === "subtract" && quantity > Number(form.dataset.currentStock || 0)) { toast(state.lang === "ar" ? "لا يمكن خصم الكمية" : "Cannot subtract quantity", state.lang === "ar" ? "الكمية المطلوب خصمها أكبر من المخزون المتاح." : "The quantity to subtract is greater than the available stock.", "error"); return false; }
    const ok = await runWrite(async () => {
      const { data: rpcData, error } = await db.rpc("admin_adjust_inventory", { p_movement_type: movementType, p_note: data.note || null, p_product_id: form.dataset.id, p_quantity: quantity });
      if (error) throw error;
      closeModal();
      toast(state.lang === "ar" ? "تم تحديث المخزون" : "Inventory updated", state.lang === "ar" ? "تم تنفيذ الحركة وتسجيلها بنجاح." : "The movement was completed and recorded.", "success");
      await renderPage();
    });
    return ok;
  }
  if (form.id === "shippingZoneForm") {
    const name = String(form.elements.name.value || "").trim();
    const price = Number(form.elements.shipping_cost.value);
    if (!name || !Number.isFinite(price) || price < 0) { toast(t("operationFailed"), t("invalidShippingPrice"), "error"); return false; }
    const id = form.dataset.id;
    const existing = await db.from("shipping_zones").select("id,name").ilike("name", name);
    if (existing.error) { toast(t("operationFailed"), existing.error.message, "error"); return false; }
    if ((existing.data || []).some((row) => String(row.id) !== String(id))) { toast(t("operationFailed"), t("duplicateShippingZone"), "error"); return false; }
    const payload = { name, shipping_cost: price, is_active: Boolean(form.elements.is_active.checked) };
    const ok = await runWrite(async () => { const result = id ? await db.from("shipping_zones").update(payload).eq("id", id).select("id").maybeSingle() : await db.from("shipping_zones").insert(payload).select("id").single(); if (result.error) throw result.error; closeModal(); toast(t("operationSuccess"), t("shipping"), "success"); await renderPage(); });
    return ok;
  }
  if (form.id === "couponForm") { const payload = typedPayload(form, ["code", "discount_type", "discount_value", "usage_limit", "expires_at", "is_active"]); const ok = await runWrite(async () => { const result = await db.from("coupons").insert(payload); if (result.error) throw result.error; closeModal(); toast(t("operationSuccess"), t("coupons"), "success"); await renderPage(); }); return ok; }
}

function csvValue(value) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }
function downloadCsv(rows, filename) { if (!rows?.length) return toast(t("noData"), t("noDataHint"), "info"); const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))]; const csv = `\ufeff${headers.map(csvValue).join(",")}\n${rows.map((row) => headers.map((header) => csvValue(row[header])).join(",")).join("\n")}`; const blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); }
function printOrder(id) { const order = window.__dashboardOrders?.find((row) => row.id === id); const title = order ? `${t("orderNumber")}: ${valueOf(order, ["order_number", "id"])} · ${money(orderTotal(order))}` : t("orderDetails"); const printWindow = window.open("", "_blank", "width=800,height=600"); if (!printWindow) return toast(t("operationFailed"), "Popup blocked", "error"); printWindow.document.write(`<html dir="${state.lang === "ar" ? "rtl" : "ltr"}"><head><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#202020}h1{font-size:22px;border-bottom:1px solid #ddd;padding-bottom:15px}p{line-height:1.8}</style></head><body><h1>T and mo · ${escapeHtml(title)}</h1><p>${escapeHtml(valueOf(order, ["customer_name", "customer_phone"], ""))}</p><p>${escapeHtml([order?.shipping_address, order?.city, order?.governorate].filter(Boolean).join(" · "))}</p><p>${new Date().toLocaleString()}</p></body></html>`); printWindow.document.close(); printWindow.focus(); printWindow.print(); }

async function handleAction(event) {
  const target = event.target.closest("[data-action]"); if (!target) return; const action = target.dataset.action;
  if (action === "navigate") { state.page = target.dataset.page; state.search = ""; state.currentPage = 1; await renderPage(); return; }
  if (action === "refresh") { await checkConnection(); await renderPage(); return; }
  if (action === "close-modal") { closeModal(); return; }
  if (action === "show-order") { await openOrderDetails(target.dataset.id); return; }
  if (action === "edit-order") { const result = await db.from("orders").select("*").eq("id", target.dataset.id).maybeSingle(); if (result.error || !result.data) { toast(t("operationFailed"), result.error?.message || t("noData"), "error"); return; } openModal(state.lang === "ar" ? "تعديل الطلب" : "Edit order", orderEditForm(result.data), "COMMERCE / EDIT ORDER"); return; }
  if (action === "delete-order") { if (!window.confirm(state.lang === "ar" ? "حذف الطلب نهائياً مع منتجاته وسجل حالاته؟" : "Delete this order permanently with its items and history?")) return; await runWrite(async () => { const id = target.dataset.id; await db.from("order_status_history").delete().eq("order_id", id); await db.from("order_items").delete().eq("order_id", id); const result = await db.from("orders").delete().eq("id", id).select(); if (result.error) throw result.error; if (!result.data?.length) throw new Error(state.lang === "ar" ? "لم يتم الحذف، تأكد من صلاحيات الحذف على جدول الطلبات." : "Nothing was deleted. Check delete permissions on the orders table."); closeDrawer(); toast(t("operationSuccess"), t("orders"), "success"); await renderPage(); }); return; }
  if (action === "change-order-status") { openModal(t("changeStatus"), statusForm(target.dataset.id), "COMMERCE / ORDER STATUS"); return; }
  if (action === "print-order") { printOrder(target.dataset.id); return; }
  if (action === "add-product") { openProductForm(); return; }
  if (action === "edit-product") { openProductForm(target.dataset.id); return; }
  if (action === "delete-product") { if (!window.confirm(state.lang === "ar" ? "حذف المنتج نهائياً؟" : "Delete this product permanently?")) return; await runWrite(async () => { const result = await db.from("products").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("products"), "success"); await renderPage(); }); return; }
  if (action === "add-category") { openCategoryForm(); return; }
  if (action === "edit-category") { openCategoryForm(target.dataset.id); return; }
  if (action === "delete-category") { if (!window.confirm(state.lang === "ar" ? "حذف التصنيف؟" : "Delete this category?")) return; await runWrite(async () => { const result = await db.from("categories").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("categories"), "success"); await renderPage(); }); return; }
  if (action === "adjust-inventory") { const result = await db.from("products").select("*").eq("id", target.dataset.id).maybeSingle(); if (result.error) return toast(t("operationFailed"), result.error.message, "error"); openModal(t("adjustStock"), inventoryForm(result.data || {}), "OPERATIONS / INVENTORY"); return; }
  if (action === "add-banner") { openBannerForm(); return; }
  if (action === "edit-banner") { openBannerForm(target.dataset.id); return; }
  if (action === "delete-banner") { if (!window.confirm(state.lang === "ar" ? "حذف البانر؟" : "Delete banner?")) return; await runWrite(async () => { const result = await db.from("banners").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("banners"), "success"); await renderPage(); }); return; }
  if (action === "add-shipping-zone") { openShippingZoneForm(); return; }
  if (action === "edit-shipping-zone") { openShippingZoneForm(target.dataset.id); return; }
  if (action === "delete-shipping-zone") { if (!window.confirm(t("confirmDeleteShipping"))) return; await runWrite(async () => { const result = await db.from("shipping_zones").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("shipping"), "success"); await renderPage(); }); return; }
  if (action === "add-coupon") { openModal(t("addCoupon"), couponForm(), "COMMERCE / COUPON"); return; }
  if (action === "delete-generic") { if (!window.confirm(state.lang === "ar" ? "حذف السجل؟" : "Delete this record?")) return; await runWrite(async () => { const result = await db.from(target.dataset.table).delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), target.dataset.table, "success"); await renderPage(); }); return; }
  if (["review-approve", "review-reject"].includes(action)) { await runWrite(async () => { const result = await db.from("reviews").update({ is_approved: action === "review-approve" }).eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("reviews"), "success"); await renderPage(); }); return; }
  if (action === "delete-review") { if (!window.confirm(state.lang === "ar" ? "حذف التقييم؟" : "Delete this review?")) return; await runWrite(async () => { const result = await db.from("reviews").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("reviews"), "success"); await renderPage(); }); return; }
  if (action === "mark-notification") { await runWrite(async () => { const result = await db.from("notifications").update({ is_read: true }).eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("notifications"), "success"); await renderPage(); }); return; }
  if (action === "mark-all-notifications") { await runWrite(async () => { const result = await db.from("notifications").update({ is_read: true }).eq("is_read", false); if (result.error) throw result.error; toast(t("operationSuccess"), t("notifications"), "success"); await renderPage(); }); return; }
  if (action === "delete-notification") { if (!window.confirm(state.lang === "ar" ? "حذف الإشعار؟" : "Delete notification?")) return; await runWrite(async () => { const result = await db.from("notifications").delete().eq("id", target.dataset.id); if (result.error) throw result.error; toast(t("operationSuccess"), t("notifications"), "success"); await renderPage(); }); return; }
  if (action === "page") { const next = Number(target.dataset.pageNumber); if (next < 1 || target.disabled) return; state.currentPage = next; await renderPage(); return; }
  if (action === "export-current") { const config = genericConfig[state.page]; const table = config?.table || state.page; const result = await getAll(table, { order: "created_at", ascending: false, limit: 500 }); if (result.error) return toast(t("operationFailed"), result.error.message, "error"); downloadCsv(result.data, `${state.page}-${new Date().toISOString().slice(0, 10)}.csv`); return; }
  if (action === "export-analytics") { downloadCsv(window.__analyticsRows || [], `tandmo-analytics-${new Date().toISOString().slice(0, 10)}.csv`); return; }
  if (action === "print-report") { window.print(); return; }
}

function bindEvents() {
  $("#navList").addEventListener("click", async (event) => { const item = event.target.closest("[data-nav]"); if (!item) return; state.page = item.dataset.nav; state.search = ""; state.currentPage = 1; $("#sidebar").classList.remove("mobile-open"); await renderPage(); });
  $("#content").addEventListener("click", handleAction); $("#modalBody").addEventListener("click", handleAction); $("#drawerBody").addEventListener("click", handleAction);
  document.addEventListener("submit", handleSubmit);
  $("#modalBody").addEventListener("change", (event) => {
    const input = event.target;
    if (!input.matches("input[name=product_images], input[name=category_image], input[name=banner_image]")) return;
    const preview = $("[data-image-preview]", input.closest("form"));
    const isCategoryImage = input.name === "category_image" || input.name === "banner_image";
    const files = [...input.files].slice(0, isCategoryImage ? 1 : 5);
    preview.innerHTML = files.length
      ? files.map((file) => `<div class="image-preview"><img src="${URL.createObjectURL(file)}" alt=""><span>${escapeHtml(file.name)}</span></div>`).join("")
      : `<span class="muted image-empty">${state.lang === "ar" ? (isCategoryImage ? "لم تتم إضافة صورة بعد" : "لم تتم إضافة صور بعد") : (isCategoryImage ? "No image added yet" : "No images added yet")}</span>`;
  });
  $("#content").addEventListener("change", async (event) => { if (event.target.matches("[data-shipping-status]")) { const url = new URL(location.href); url.searchParams.set("shippingStatus", event.target.value); history.replaceState(null, "", url); await renderPage(); } if (event.target.matches("[data-shipping-sort]")) { state.shippingSort = event.target.value; await renderPage(); } });
  $("#globalSearch").addEventListener("input", debounce(async (event) => { state.search = event.target.value; state.currentPage = 1; await renderPage(); }, 350));
  $("#content").addEventListener("input", debounce(async (event) => { if (event.target.matches("[data-table-search]")) { state.search = event.target.value; state.currentPage = 1; await renderPage(); } }, 350));
  $("#sidebarCollapse").addEventListener("click", () => { $("#sidebar").classList.toggle("is-collapsed"); $("#sidebarCollapse").innerHTML = icon($("#sidebar").classList.contains("is-collapsed") ? "panel-left-open" : "panel-left-close"); refreshIcons(); });
  $("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("mobile-open"));
  $("#modalClose").addEventListener("click", closeModal); $("#drawerClose").addEventListener("click", closeDrawer); $("#modalBackdrop").addEventListener("click", (event) => { if (event.target === event.currentTarget) closeModal(); }); $("#drawerBackdrop").addEventListener("click", (event) => { if (event.target === event.currentTarget) closeDrawer(); });
  $("#themeToggle").addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; localStorage.setItem("tandmo-theme", state.theme); applyPreferences(); if (state.page === "dashboard" && window.__dashboardOrders) renderDashboardCharts(window.__dashboardOrders, state.chartDays || 7); });
  $("#languageToggle").addEventListener("click", async () => { state.lang = state.lang === "ar" ? "en" : "ar"; localStorage.setItem("tandmo-lang", state.lang); applyPreferences(); renderAccessState(); await renderPage(); });
  $("#notificationButton").addEventListener("click", () => { state.page = "notifications"; state.search = ""; state.currentPage = 1; renderPage(); });
  $("#content").addEventListener("click", (event) => { const tab = event.target.closest("[data-chart-days]"); if (tab && window.__dashboardOrders) { $$("[data-chart-days]").forEach((node) => node.classList.toggle("active", node === tab)); renderDashboardCharts(window.__dashboardOrders, Number(tab.dataset.chartDays)); } });
}
function debounce(callback, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => callback(...args), delay); }; }
async function updateNotificationBadge() { const result = await db.from("notifications").select("id", { count: "exact", head: true }).eq("is_read", false); const badge = $("#notificationBadge"); if (result.error || !result.count) badge.classList.add("hidden"); else { badge.textContent = result.count > 99 ? "99+" : result.count; badge.classList.remove("hidden"); } }

async function init() { applyPreferences(); bindEvents(); await checkConnection(); await updateNotificationBadge(); await renderPage(); refreshIcons(); }
init().catch((error) => { console.error(error); setHTML($("#content"), errorMarkup(error.message || "Initialization error")); });
