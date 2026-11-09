// Douple Flower Shop - Quản trị viên (Admin Portal Logic)
const AdminApp = {
  activeTab: "overview",
  currentOrderFilter: "all",
  currentSearchQuery: "",
  orders: [],
  customRequests: [],
  products: [],
  settings: {},
  editingProductImages: [],
  currentEditingProductId: null,
  currentConfirmingOrderId: null,

  init() {
    this.checkAuth();
    this.loadData();
    this.renderStats();
    this.renderRevenueChart();
    this.renderOrdersTable();
    this.renderCustomRequestsTable();
    this.renderProductsTable();
    this.loadSettingsForm();
    this.bindEvents();
  },

  // ================= 1. XÁC THỰC ADMIN =================
  checkAuth() {
    const isLoggedIn = sessionStorage.getItem("douple_admin_auth") === "true";
    const loginWrapper = document.getElementById("adminLoginWrapper");
    const adminLayout = document.getElementById("adminAppLayout");

    if (isLoggedIn) {
      if (loginWrapper) loginWrapper.style.display = "none";
      if (adminLayout) adminLayout.style.display = "flex";
    } else {
      if (loginWrapper) loginWrapper.style.display = "flex";
      if (adminLayout) adminLayout.style.display = "none";
    }
  },

  login(password) {
    // Mật khẩu mặc định: douple2026 hoặc admin123
    const validPass = localStorage.getItem("douple_admin_pass") || "douple2026";
    if (password === validPass || password === "admin123" || password === "admin") {
      sessionStorage.setItem("douple_admin_auth", "true");
      localStorage.setItem("douple_is_admin", "true");
      this.checkAuth();
      this.showToast("Đăng nhập trang quản trị thành công!", "success");
      this.loadData();
      this.renderStats();
      this.renderRevenueChart();
      this.renderOrdersTable();
    } else {
      this.showToast("Mật khẩu không chính xác! Vui lòng thử lại", "error");
    }
  },

  logout() {
    sessionStorage.removeItem("douple_admin_auth");
    localStorage.removeItem("douple_is_admin");
    this.checkAuth();
    this.showToast("Đã đăng xuất trang quản trị", "info");
  },

  // ================= 2. QUẢN LÝ DỮ LIỆU =================
  loadData() {
    // 1. Tải đơn hàng
    try {
      const storedOrders = JSON.parse(localStorage.getItem("douple_orders") || "[]");
      if (storedOrders.length === 0) {
        // Dữ liệu mẫu ban đầu để admin xem ngay
        this.orders = [
          {
            orderId: "DF839102",
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            shipping: {
              receiverName: "Nguyễn Thùy Linh",
              receiverPhone: "0987654321",
              city: "Hà Nội",
              district: "Cầu Giấy",
              address: "Số 18 Duy Tân",
              greetingCard: "Chúc mừng sinh nhật em gái yêu quý! Chúc em luôn rạng rỡ và hạnh phúc.",
              deliveryTime: "standard",
              note: "Giao trong giờ hành chính"
            },
            items: [
              { id: "df-01", name: "Bó Hoa Ly Kẽm Nhung Hồng Pastel", price: 380000, quantity: 1, image: "assets/bo_hoa_ly_hong.jpg" }
            ],
            subtotal: 380000,
            shippingFee: 30000,
            total: 410000,
            paymentMethod: "cod_deposit",
            paymentNote: "COD nhận hàng (Cọc 50% chuyển khoản)",
            depositAmount: 205000,
            remainAmount: 205000,
            paymentConfirmed: false,
            paymentStatus: "unpaid",
            status: "Chờ xác nhận"
          },
          {
            orderId: "DF942150",
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
            shipping: {
              receiverName: "Trần Anh Quân",
              receiverPhone: "0912345678",
              city: "Hà Nội",
              district: "Ba Đình",
              address: "Tòa Lancaster, 20 Núi Trúc",
              greetingCard: "Happy Graduation! Chúc mừng tân cử nhân xuất sắc.",
              deliveryTime: "fast",
              note: "Cần hoa trước 11h trưa chụp kỷ yếu"
            },
            items: [
              { id: "df-05", name: "Bó Hoa Hướng Dương Kẽm Nhung Rực Rỡ (Tốt Nghiệp)", price: 420000, quantity: 1, image: "assets/bo_huong_duong.jpg" }
            ],
            subtotal: 420000,
            shippingFee: 30000,
            total: 450000,
            paymentMethod: "vietqr",
            paymentNote: "Chuyển khoản VietQR (100%)",
            depositAmount: 450000,
            remainAmount: 0,
            paymentConfirmed: true,
            paidAmount: 450000,
            paymentChannel: "MB Bank (0393613156)",
            paymentConfirmedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
            paymentConfirmedNote: "Đã khớp giao dịch MB Bank lúc 13h15",
            paymentStatus: "paid",
            status: "Đang giao hàng"
          },
          {
            orderId: "DF671932",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            shipping: {
              receiverName: "Lê Minh Khôi",
              receiverPhone: "0393613156",
              city: "TP. Hồ Chí Minh",
              district: "Quận 1",
              address: "45 Lê Thánh Tôn",
              greetingCard: "Kỷ niệm 3 năm ngày yêu nhau ♡",
              deliveryTime: "standard",
              note: ""
            },
            items: [
              { id: "df-03", name: "Hộp Trụ Hoa Ly Kẽm Nhung Kim Tuyến Kèm Đèn LED", price: 520000, quantity: 1, image: "assets/hop_hoa_kim_tuyen.jpg" }
            ],
            subtotal: 520000,
            shippingFee: 0,
            total: 520000,
            paymentMethod: "applepay",
            paymentNote: "Apple Pay (100%)",
            depositAmount: 520000,
            remainAmount: 0,
            paymentConfirmed: true,
            paidAmount: 520000,
            paymentChannel: "Apple Pay / Thẻ",
            paymentConfirmedAt: new Date(Date.now() - 86400000).toISOString(),
            paymentConfirmedNote: "Hệ thống xác thực thành công",
            paymentStatus: "paid",
            status: "Đã hoàn thành"
          }
        ];
        localStorage.setItem("douple_orders", JSON.stringify(this.orders));
      } else {
        this.orders = storedOrders.map(ord => {
          if (ord.paymentConfirmed === undefined) {
            const st = (ord.status || "").toLowerCase();
            if (st.includes("hoàn tất") || st.includes("thành")) {
              ord.paymentConfirmed = true;
              ord.paidAmount = ord.total;
              ord.paymentChannel = "Đã thu hoàn tất";
            } else if (st.includes("cọc")) {
              ord.paymentConfirmed = true;
              ord.paidAmount = ord.depositAmount || Math.round(ord.total * 0.5);
              ord.paymentChannel = "MB Bank (Cọc 50%)";
            } else {
              ord.paymentConfirmed = false;
            }
          }
          return ord;
        });
      }
    } catch (e) {
      this.orders = [];
    }

    // 2. Tải yêu cầu làm theo mẫu
    try {
      this.customRequests = JSON.parse(localStorage.getItem("douple_custom_requests") || "[]");
      if (this.customRequests.length === 0) {
        this.customRequests = [
          {
            id: "REQ182930",
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
            customerName: "Hoàng Thảo My",
            customerPhone: "0971234888",
            flowerType: "Hoa Ly Kẽm Nhung",
            colorTheme: "Hồng Pastel",
            packaging: "Hộp Trụ Vintage Có Quai Xách",
            accessories: ["Dây Đèn LED Đom Đóm Phát Sáng", "Thiệp Hoa Khô Viết Tay Theo Yêu Cầu"],
            budget: "Từ 400.000đ - 650.000đ",
            occasion: "Sinh nhật bạn thân",
            notes: "Mình muốn phối thêm vài bông hoa cúc baby trắng và nơ ren vintage màu kem ạ",
            deliveryDate: "2026-10-18",
            status: "Chờ thợ hoa báo giá"
          }
        ];
        localStorage.setItem("douple_custom_requests", JSON.stringify(this.customRequests));
      }
    } catch (e) {
      this.customRequests = [];
    }

    // 3. Tải danh mục sản phẩm
    try {
      const storedProducts = JSON.parse(localStorage.getItem("douple_products") || "[]");
      if (storedProducts.length === 0) {
        this.products = (typeof PRODUCTS_DATA !== "undefined") ? PRODUCTS_DATA.map(p => ({
          ...p,
          images: (p.images && p.images.length > 0) ? [...p.images] : [p.image || "assets/bo_hoa_ly_hong.jpg"]
        })) : [];
        localStorage.setItem("douple_products", JSON.stringify(this.products));
      } else {
        this.products = storedProducts.map(p => {
          if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
            p.images = [p.image || "assets/bo_hoa_ly_hong.jpg"];
          }
          if (!p.image && p.images.length > 0) {
            p.image = p.images[0];
          }
          return p;
        });
      }
    } catch (e) {
      this.products = [];
    }

    // 4. Tải cài đặt
    try {
      this.settings = JSON.parse(localStorage.getItem("douple_settings") || JSON.stringify(typeof STORE_INFO !== "undefined" ? STORE_INFO : {}));
    } catch (e) {
      this.settings = {};
    }
  },

  // ================= 3. THỐNG KÊ & KPI =================
  renderStats() {
    const totalRevEl = document.getElementById("statTotalRevenue");
    const totalOrdersEl = document.getElementById("statTotalOrders");
    const depositOrdersEl = document.getElementById("statDepositOrders");
    const customReqsEl = document.getElementById("statCustomRequests");
    const ordersBadgeEl = document.getElementById("navOrdersBadge");
    const reqsBadgeEl = document.getElementById("navReqsBadge");

    const totalRev = this.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
    const depositCount = this.orders.filter(ord => (ord.status || "").includes("cọc") || (ord.paymentMethod === "cod_deposit")).length;

    if (totalRevEl) totalRevEl.textContent = this.formatCurrency(totalRev);
    if (totalOrdersEl) totalOrdersEl.textContent = this.orders.length;
    if (depositOrdersEl) depositOrdersEl.textContent = depositCount;
    if (customReqsEl) customReqsEl.textContent = this.customRequests.length;

    if (ordersBadgeEl) ordersBadgeEl.textContent = this.orders.length;
    if (reqsBadgeEl) reqsBadgeEl.textContent = this.customRequests.length;
  },

  renderRevenueChart() {
    const container = document.getElementById("revenueChartBox");
    if (!container) return;

    // Tạo biểu đồ thanh doanh thu 7 ngày bằng SVG
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const revenues = [410000, 780000, 450000, 920000, 1150000, 1420000, 890000];
    const maxRev = Math.max(...revenues);

    container.innerHTML = `
      <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; padding: 20px 10px 0; gap: 14px;">
        ${revenues.map((val, idx) => {
          const heightPercent = Math.round((val / maxRev) * 100);
          return `
            <div style="display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-primary);">${Math.round(val/1000)}k</span>
              <div style="width: 100%; max-width: 38px; height: ${heightPercent}%; background: linear-gradient(180deg, #D96B7D 0%, #1E3A2F 100%); border-radius: 6px 6px 2px 2px; transition: height 0.5s ease;"></div>
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--admin-text-muted);">${days[idx]}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  // ================= 4. BẢNG ĐƠN HÀNG =================
  renderOrdersTable() {
    const tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;

    let filtered = [...this.orders];

    if (this.currentOrderFilter !== "all") {
      filtered = filtered.filter(ord => {
        const status = (ord.status || "").toLowerCase();
        if (this.currentOrderFilter === "unconfirmed_payment") return !ord.paymentConfirmed;
        if (this.currentOrderFilter === "confirmed_payment") return !!ord.paymentConfirmed;
        if (this.currentOrderFilter === "deposit") return status.includes("cọc");
        if (this.currentOrderFilter === "making") return status.includes("làm") || status.includes("chuẩn bị");
        if (this.currentOrderFilter === "shipping") return status.includes("giao");
        if (this.currentOrderFilter === "completed") return status.includes("thành") || status.includes("hoàn tất");
        return true;
      });
    }

    if (this.currentSearchQuery) {
      const q = this.currentSearchQuery.toLowerCase();
      filtered = filtered.filter(ord => 
        (ord.orderId || "").toLowerCase().includes(q) ||
        (ord.shipping?.receiverName || "").toLowerCase().includes(q) ||
        (ord.shipping?.receiverPhone || "").toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">
            <i class="bi bi-inbox" style="font-size: 2.2rem; display: block; margin-bottom: 8px;"></i>
            Không tìm thấy đơn hàng nào phù hợp
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(ord => {
      const badgeClass = this.getStatusBadgeClass(ord.status);
      const isDeposit = ord.paymentMethod === "cod_deposit";

      return `
        <tr>
          <td>
            <strong style="font-family: monospace; color: var(--color-primary); font-size: 0.95rem;">${ord.orderId}</strong>
            <div style="font-size: 0.75rem; color: var(--admin-text-light);">${new Date(ord.createdAt).toLocaleDateString("vi-VN")}</div>
          </td>
          <td>
            <strong>${ord.shipping?.receiverName || "Khách hàng"}</strong>
            <div style="font-size: 0.8rem; color: var(--admin-text-muted);">
              <a href="tel:${ord.shipping?.receiverPhone}" style="color: var(--color-primary);"><i class="bi bi-telephone"></i> ${ord.shipping?.receiverPhone}</a>
            </div>
          </td>
          <td>
            <div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ord.items?.map(i => i.name).join(", ")}">
              ${ord.items?.map(i => `${i.name} (x${i.quantity})`).join(", ") || "Hoa kẽm nhung"}
            </div>
          </td>
          <td>
            <strong style="color: var(--color-danger);">${this.formatCurrency(ord.total)}</strong>
            ${isDeposit ? `
              <div style="font-size: 0.75rem; color: var(--color-warning); font-weight: 600;">
                Cọc 50%: ${this.formatCurrency(ord.depositAmount)}
              </div>
            ` : ""}
          </td>
          <td>
            <div style="font-size: 0.8rem; font-weight: 500; margin-bottom: 4px;">
              ${ord.paymentMethod === 'vietqr' ? '<i class="bi bi-qr-code"></i> VietQR' : ord.paymentMethod === 'applepay' ? '<i class="bi bi-apple"></i> Apple Pay' : '<i class="bi bi-cash-stack"></i> COD cọc 50%'}
            </div>
            ${ord.paymentConfirmed ? `
              <div>
                <span class="admin-badge" style="background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; font-size: 0.76rem;">
                  <i class="bi bi-check-circle-fill" style="color: #10B981;"></i> Đã nhận: ${this.formatCurrency(ord.paidAmount || ord.depositAmount || ord.total)}
                </span>
                <div style="font-size: 0.7rem; color: #059669; margin-top: 2px;">
                  <i class="bi bi-bank"></i> ${ord.paymentChannel || 'MB Bank'}
                </div>
              </div>
            ` : `
              <div>
                <span class="admin-badge" style="background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; font-size: 0.75rem;">
                  <i class="bi bi-hourglass-split" style="color: #F59E0B;"></i> Chưa xác nhận tiền
                </span>
                <div>
                  <button type="button" class="admin-btn admin-btn-sm" style="background: #10B981; color: #FFF; font-size: 0.73rem; padding: 4px 8px; margin-top: 4px; border: none; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight: 600;" onclick="AdminApp.openConfirmPaymentModal('${ord.orderId}')" title="Xác nhận đã nhận tiền khách thanh toán">
                    <i class="bi bi-cash-coin"></i> Xác nhận đã nhận tiền
                  </button>
                </div>
              </div>
            `}
          </td>
          <td>
            <span class="admin-badge ${badgeClass}">${ord.status}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-table-action" onclick="AdminApp.viewOrderDetail('${ord.orderId}')" title="Xem chi tiết đơn">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn-table-action" style="color: #10B981;" onclick="AdminApp.openConfirmPaymentModal('${ord.orderId}')" title="Xác nhận nhận tiền thanh toán">
                <i class="bi bi-cash-coin"></i>
              </button>
              <button class="btn-table-action" onclick="AdminApp.printInvoice('${ord.orderId}')" title="In hoá đơn">
                <i class="bi bi-printer"></i>
              </button>
              <button class="btn-table-action" onclick="AdminApp.openStatusModal('${ord.orderId}')" title="Cập nhật trạng thái">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn-table-action danger" onclick="AdminApp.deleteOrder('${ord.orderId}')" title="Xoá đơn">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  },

  getStatusBadgeClass(status) {
    status = (status || "").toLowerCase();
    if (status.includes("cọc")) return "badge-deposit";
    if (status.includes("làm") || status.includes("chuẩn bị")) return "badge-making";
    if (status.includes("giao")) return "badge-shipping";
    if (status.includes("thành") || status.includes("hoàn tất")) return "badge-completed";
    if (status.includes("hủy")) return "badge-cancelled";
    return "badge-pending";
  },

  viewOrderDetail(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    const modal = document.getElementById("orderDetailModal");
    const body = document.getElementById("orderDetailModalBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--admin-border); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.25rem; color: var(--color-primary);">Mã đơn: <span style="font-family: monospace;">${order.orderId}</span></h3>
            <span style="font-size: 0.85rem; color: var(--admin-text-muted);">Thời gian: ${new Date(order.createdAt).toLocaleString("vi-VN")}</span>
          </div>
          <span class="admin-badge ${this.getStatusBadgeClass(order.status)}" style="font-size: 0.9rem; padding: 6px 14px;">
            ${order.status}
          </span>
        </div>

        <!-- Khối xác nhận tiền thanh toán nổi bật -->
        <div style="background: ${order.paymentConfirmed ? '#ECFDF5' : '#FFFBEB'}; border: 1.5px solid ${order.paymentConfirmed ? '#A7F3D0' : '#FDE68A'}; border-radius: 10px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: ${order.paymentConfirmed ? '#10B981' : '#F59E0B'}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.45rem;">
                <i class="bi ${order.paymentConfirmed ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}"></i>
              </div>
              <div>
                <strong style="color: ${order.paymentConfirmed ? '#065F46' : '#92400E'}; font-size: 1rem; display: block;">
                  ${order.paymentConfirmed ? '✓ ĐÃ XÁC NHẬN NHẬN TIỀN THANH TOÁN' : '⚠ CHƯA XÁC NHẬN NHẬN TIỀN CỦA KHÁCH'}
                </strong>
                <span style="font-size: 0.82rem; color: ${order.paymentConfirmed ? '#047857' : '#B45309'};">
                  ${order.paymentConfirmed ? `Số tiền đã nhận: <strong>${this.formatCurrency(order.paidAmount || order.depositAmount || order.total)}</strong> qua <strong>${order.paymentChannel || 'Ngân hàng'}</strong> · Lúc: ${new Date(order.paymentConfirmedAt).toLocaleString('vi-VN')}` : 'Vui lòng kiểm tra tài khoản ngân hàng và xác nhận đã nhận được tiền trước khi cho thợ hoa cắm!'}
                </span>
                ${order.paymentConfirmedNote ? `<div style="font-size: 0.78rem; font-style: italic; color: #047857; margin-top: 3px;">Ghi chú đối soát: "${order.paymentConfirmedNote}"</div>` : ''}
              </div>
            </div>
            <button class="admin-btn admin-btn-sm" style="background: ${order.paymentConfirmed ? 'transparent' : '#10B981'}; color: ${order.paymentConfirmed ? '#065F46' : '#FFF'}; border: 1px solid ${order.paymentConfirmed ? '#059669' : 'transparent'}; font-weight: 700; padding: 9px 16px; cursor: pointer;" onclick="AdminApp.openConfirmPaymentModal('${order.orderId}')">
              <i class="bi bi-cash-coin"></i> ${order.paymentConfirmed ? 'Chỉnh sửa xác nhận tiền' : 'Xác nhận đã nhận tiền ngay'}
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: #F9FAFB; padding: 14px; border-radius: 8px;">
            <strong style="display: block; margin-bottom: 8px; color: var(--color-primary);"><i class="bi bi-person-fill"></i> Người nhận:</strong>
            <div>Họ tên: <strong>${order.shipping?.receiverName}</strong></div>
            <div>SĐT: <strong>${order.shipping?.receiverPhone}</strong></div>
            <div>Địa chỉ: ${order.shipping?.address}, ${order.shipping?.district}, ${order.shipping?.city}</div>
            <div style="margin-top: 10px; display: flex; gap: 8px;">
              <a href="tel:${order.shipping?.receiverPhone}" class="admin-btn admin-btn-sm admin-btn-outline"><i class="bi bi-telephone-fill"></i> Gọi điện</a>
              <a href="https://zalo.me/${order.shipping?.receiverPhone}" target="_blank" class="admin-btn admin-btn-sm admin-btn-outline"><i class="bi bi-chat-dots-fill"></i> Chat Zalo</a>
            </div>
          </div>

          <div style="background: #F9FAFB; padding: 14px; border-radius: 8px;">
            <strong style="display: block; margin-bottom: 8px; color: var(--color-primary);"><i class="bi bi-credit-card-2-front-fill"></i> Thanh toán & Giao nhận:</strong>
            <div>Hình thức: <strong>${order.paymentNote}</strong></div>
            <div>Hẹn giao: <strong>${order.shipping?.deliveryTime === 'fast' ? 'Giao hỏa tốc trong ngày' : 'Giao tiêu chuẩn (1-2 ngày)'}</strong></div>
            ${order.depositAmount ? `<div>Tiền cọc 50%: <strong style="color: var(--color-primary);">${this.formatCurrency(order.depositAmount)}</strong></div>` : ""}
            ${order.remainAmount ? `<div style="color: var(--color-warning); font-weight: 700;">Shipper cần thu: ${this.formatCurrency(order.remainAmount)}</div>` : ""}
          </div>
        </div>

        ${order.shipping?.greetingCard ? `
          <div style="background: var(--color-rose-soft); padding: 12px 16px; border-radius: 8px; border-left: 4px solid var(--color-rose);">
            <strong style="color: var(--color-rose);"><i class="bi bi-envelope-heart-fill"></i> Lời chúc ghi thiệp đính kèm:</strong>
            <p style="font-style: italic; margin-top: 4px; font-size: 0.92rem;">"${order.shipping.greetingCard}"</p>
          </div>
        ` : ""}

        <div>
          <h4 style="font-size: 1rem; margin-bottom: 10px;">Sản phẩm trong đơn:</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${order.items?.map(it => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid var(--admin-border); border-radius: 6px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <img src="${it.image}" alt="${it.name}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
                  <div>
                    <strong>${it.name}</strong>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted);">Đơn giá: ${this.formatCurrency(it.price)} · Số lượng: x${it.quantity}</div>
                  </div>
                </div>
                <strong style="color: var(--color-danger);">${this.formatCurrency(it.price * it.quantity)}</strong>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--admin-border); padding-top: 16px;">
          <div style="font-size: 1.15rem; font-weight: 800;">Tổng thanh toán: <span style="color: var(--color-danger);">${this.formatCurrency(order.total)}</span></div>
          <div style="display: flex; gap: 10px;">
            <button class="admin-btn admin-btn-outline" onclick="AdminApp.printInvoice('${order.orderId}')"><i class="bi bi-printer"></i> In Hóa Đơn</button>
            <button class="admin-btn admin-btn-primary" onclick="AdminApp.openStatusModal('${order.orderId}')"><i class="bi bi-arrow-repeat"></i> Đổi trạng thái</button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  openConfirmPaymentModal(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    this.currentConfirmingOrderId = orderId;
    const modal = document.getElementById("confirmPaymentModal");
    const body = document.getElementById("confirmPaymentModalBody");
    if (!modal || !body) return;

    const depositVal = order.depositAmount || Math.round(order.total * 0.5);
    const totalVal = order.total || 0;
    const isDepositMethod = order.paymentMethod === "cod_deposit";

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Thông tin đơn -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--admin-text-muted);">Mã đơn hàng:</span>
            <strong style="font-family: monospace; color: var(--color-primary);">${order.orderId}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--admin-text-muted);">Khách hàng:</span>
            <strong>${order.shipping?.receiverName} (${order.shipping?.receiverPhone})</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--admin-text-muted);">Tổng giá trị đơn:</span>
            <strong style="color: var(--color-danger); font-size: 1rem;">${this.formatCurrency(totalVal)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--admin-text-muted);">Phương thức thanh toán:</span>
            <span style="font-weight: 600; color: var(--color-primary);">${order.paymentNote || order.paymentMethod}</span>
          </div>
        </div>

        ${order.paymentConfirmed ? `
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; padding: 12px 14px; border-radius: 8px; font-size: 0.85rem; color: #065F46;">
            <i class="bi bi-check-circle-fill" style="color: #10B981;"></i> Đơn này hiện đã được ghi nhận: <strong>Đã nhận ${this.formatCurrency(order.paidAmount || order.total)}</strong> qua <strong>${order.paymentChannel || 'Ngân hàng'}</strong>.
          </div>
        ` : `
          <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 12px 14px; border-radius: 8px; font-size: 0.85rem; color: #92400E;">
            <i class="bi bi-info-circle-fill" style="color: #F59E0B;"></i> Đơn này <strong>chưa xác nhận nhận tiền</strong>. Vui lòng kiểm tra biến động số dư tài khoản ngân hàng rồi chọn số tiền đã nhận bên dưới.
          </div>
        `}

        <!-- Lựa chọn số tiền đã nhận -->
        <div class="admin-form-group" style="margin-bottom: 6px;">
          <label style="font-weight: 700; color: var(--color-primary); display: block; margin-bottom: 8px;">
            Chọn số tiền bạn đã nhận được từ khách hàng: *
          </label>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="display: flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 10px 14px; border-radius: 8px; cursor: pointer;">
              <input type="radio" name="confirmPayType" value="deposit" ${isDepositMethod ? 'checked' : ''} onchange="AdminApp.handleConfirmPayTypeChange(this.value)">
              <div>
                <strong>Đã nhận tiền cọc 50%: ${this.formatCurrency(depositVal)}</strong>
                <small style="color: var(--admin-text-muted); display: block;">Áp dụng cho đơn COD cọc trước 50% để tiệm cắm hoa</small>
              </div>
            </label>

            <label style="display: flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 10px 14px; border-radius: 8px; cursor: pointer;">
              <input type="radio" name="confirmPayType" value="full" ${!isDepositMethod ? 'checked' : ''} onchange="AdminApp.handleConfirmPayTypeChange(this.value)">
              <div>
                <strong>Đã nhận đủ 100% thanh toán: ${this.formatCurrency(totalVal)}</strong>
                <small style="color: var(--admin-text-muted); display: block;">Khách chuyển khoản VietQR full 100% hoặc Apple Pay</small>
              </div>
            </label>

            <label style="display: flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1.5px solid #E2E8F0; padding: 10px 14px; border-radius: 8px; cursor: pointer;">
              <input type="radio" name="confirmPayType" value="custom" onchange="AdminApp.handleConfirmPayTypeChange(this.value)">
              <div style="flex: 1;">
                <strong>Nhập số tiền thực tế nhận được khác</strong>
                <input type="number" id="confirmCustomAmount" class="admin-input" placeholder="Nhập số tiền VNĐ..." style="margin-top: 6px; display: none;" value="${order.paidAmount || depositVal}">
              </div>
            </label>
          </div>
        </div>

        <!-- Kênh nhận tiền -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="admin-form-group" style="margin-bottom: 0;">
            <label for="confirmChannel" style="font-size: 0.84rem; font-weight: 600;">Kênh / Tài khoản nhận:</label>
            <select id="confirmChannel" class="admin-input" style="padding: 9px 12px;">
              <option value="MB Bank (0393613156 - DOUPLE FLOWER)" selected>MB Bank (0393613156)</option>
              <option value="VietQR Chuyển Khoản 24/7">VietQR Chuyển Khoản 24/7</option>
              <option value="Apple Pay / Thẻ">Apple Pay / Thẻ</option>
              <option value="Tiền mặt trực tiếp">Tiền mặt trực tiếp</option>
              <option value="Shipper đã thu COD giao về">Shipper đã thu COD giao về</option>
            </select>
          </div>
          <div class="admin-form-group" style="margin-bottom: 0;">
            <label for="confirmNote" style="font-size: 0.84rem; font-weight: 600;">Ghi chú đối soát (tùy chọn):</label>
            <input type="text" id="confirmNote" class="admin-input" placeholder="VD: Khớp bill MB lúc 17h30..." value="${order.paymentConfirmedNote || ''}" style="padding: 9px 12px;">
          </div>
        </div>

        <!-- Tự động cập nhật trạng thái đơn -->
        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; color: var(--admin-text-main);">
          <input type="checkbox" id="confirmAutoStatus" checked>
          <span>Đồng thời cập nhật trạng thái đơn sang <strong>"Đã cọc 50% (Đang làm hoa)"</strong> để báo thợ</span>
        </label>

        <!-- Nút hành động -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid var(--admin-border); padding-top: 16px;">
          <div>
            ${order.paymentConfirmed ? `
              <button type="button" class="admin-btn admin-btn-outline" style="color: var(--color-danger); border-color: var(--color-danger); font-size: 0.82rem; padding: 8px 12px;" onclick="AdminApp.cancelPaymentConfirmation('${order.orderId}')">
                <i class="bi bi-x-circle"></i> Hủy xác nhận tiền
              </button>
            ` : ''}
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="admin-btn admin-btn-outline admin-modal-close">Đóng</button>
            <button type="button" class="admin-btn admin-btn-primary" style="background: #10B981; border: none; font-weight: 700; padding: 10px 20px;" onclick="AdminApp.submitPaymentConfirmation('${order.orderId}')">
              <i class="bi bi-check-circle-fill"></i> Xác Nhận Đã Nhận Tiền
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  handleConfirmPayTypeChange(val) {
    const customInput = document.getElementById("confirmCustomAmount");
    if (customInput) {
      customInput.style.display = (val === "custom") ? "block" : "none";
      if (val === "custom") customInput.focus();
    }
  },

  submitPaymentConfirmation(orderId) {
    const id = orderId || this.currentConfirmingOrderId;
    const orderIndex = this.orders.findIndex(o => o.orderId === id);
    if (orderIndex === -1) return;

    const order = this.orders[orderIndex];
    const payTypeRadio = document.querySelector('input[name="confirmPayType"]:checked');
    const payType = payTypeRadio ? payTypeRadio.value : "full";

    let amount = order.total;
    if (payType === "deposit") {
      amount = order.depositAmount || Math.round(order.total * 0.5);
    } else if (payType === "full") {
      amount = order.total;
    } else if (payType === "custom") {
      amount = parseInt(document.getElementById("confirmCustomAmount")?.value) || order.total;
    }

    const channel = document.getElementById("confirmChannel")?.value || "MB Bank (0393613156)";
    const note = document.getElementById("confirmNote")?.value.trim() || "Đã đối soát nhận tiền thành công";
    const autoStatus = document.getElementById("confirmAutoStatus")?.checked;

    order.paymentConfirmed = true;
    order.paidAmount = amount;
    order.paymentChannel = channel;
    order.paymentConfirmedNote = note;
    order.paymentConfirmedAt = new Date().toISOString();
    order.paymentStatus = (amount >= order.total) ? "paid" : "deposit_paid";

    if (autoStatus) {
      if (amount >= order.total && (order.status.includes("giao") || order.status.includes("hoàn tất"))) {
        order.status = "Đã hoàn thành";
      } else {
        order.status = "Đã cọc 50% (Đang làm hoa)";
      }
    }

    localStorage.setItem("douple_orders", JSON.stringify(this.orders));
    this.renderOrdersTable();
    this.renderStats();
    this.closeModal("confirmPaymentModal");
    this.closeModal("orderDetailModal");
    this.playNotificationSound();
    this.showToast(`Đã xác nhận nhận được ${this.formatCurrency(amount)} cho đơn ${order.orderId}!`, "success");
  },

  cancelPaymentConfirmation(orderId) {
    const id = orderId || this.currentConfirmingOrderId;
    const orderIndex = this.orders.findIndex(o => o.orderId === id);
    if (orderIndex === -1) return;

    if (!confirm(`Bạn có chắc muốn hủy xác nhận nhận tiền cho đơn ${id}? Đơn sẽ trở lại trạng thái Chưa nhận tiền.`)) return;

    const order = this.orders[orderIndex];
    order.paymentConfirmed = false;
    order.paymentStatus = "unpaid";
    delete order.paidAmount;
    delete order.paymentChannel;
    delete order.paymentConfirmedNote;
    delete order.paymentConfirmedAt;

    localStorage.setItem("douple_orders", JSON.stringify(this.orders));
    this.renderOrdersTable();
    this.renderStats();
    this.closeModal("confirmPaymentModal");
    this.closeModal("orderDetailModal");
    this.showToast(`Đã hủy xác nhận thanh toán đơn ${id}`, "info");
  },

  openStatusModal(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    this.currentEditingOrderId = orderId;
    const modal = document.getElementById("changeStatusModal");
    const select = document.getElementById("orderStatusSelect");
    if (!modal || !select) return;

    select.value = order.status;
    modal.classList.add("active");
  },

  saveOrderStatus() {
    const select = document.getElementById("orderStatusSelect");
    if (!select || !this.currentEditingOrderId) return;

    const newStatus = select.value;
    const orderIndex = this.orders.findIndex(o => o.orderId === this.currentEditingOrderId);
    if (orderIndex > -1) {
      this.orders[orderIndex].status = newStatus;
      localStorage.setItem("douple_orders", JSON.stringify(this.orders));
      this.renderOrdersTable();
      this.renderStats();
      this.closeModal("changeStatusModal");
      this.closeModal("orderDetailModal");
      this.showToast(`Đã chuyển đơn ${this.currentEditingOrderId} sang "${newStatus}"`, "success");
    }
  },

  deleteOrder(orderId) {
    if (!confirm(`Bạn có chắc chắn muốn xoá đơn hàng ${orderId}?`)) return;
    this.orders = this.orders.filter(o => o.orderId !== orderId);
    localStorage.setItem("douple_orders", JSON.stringify(this.orders));
    this.renderOrdersTable();
    this.renderStats();
    this.showToast(`Đã xoá đơn hàng ${orderId}`, "info");
  },

  printInvoice(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    const printBox = document.getElementById("printableInvoice");
    if (!printBox) return;

    printBox.innerHTML = `
      <div class="invoice-box">
        <div class="invoice-header">
          <div class="invoice-logo-group">
            <img src="assets/logo.png" alt="Douple Flower" class="invoice-logo">
            <div>
              <h2 style="font-family: var(--font-serif); color: var(--color-primary); font-size: 1.4rem;">DOUPLE FLOWER SHOP</h2>
              <small style="color: var(--color-rose); text-transform: uppercase; font-weight: 700;">Tiệm Hoa Handmade Kẽm Nhung</small>
            </div>
          </div>
          <div style="text-align: right;">
            <h3 style="color: var(--color-primary); font-size: 1.2rem;">HÓA ĐƠN BÁN HÀNG</h3>
            <div>Mã đơn: <strong>${order.orderId}</strong></div>
            <div>Ngày in: ${new Date().toLocaleDateString("vi-VN")}</div>
          </div>
        </div>

        <div class="invoice-info-grid">
          <div>
            <strong>Đơn vị gửi:</strong>
            <div>DOUPLE FLOWER SHOP</div>
            <div>Hotline: 0393.613.156</div>
            <div>Facebook: Douple Flower Shop</div>
          </div>
          <div>
            <strong>Khách hàng người nhận:</strong>
            <div>Họ tên: <strong>${order.shipping?.receiverName}</strong></div>
            <div>Điện thoại: <strong>${order.shipping?.receiverPhone}</strong></div>
            <div>Địa chỉ: ${order.shipping?.address}, ${order.shipping?.district}, ${order.shipping?.city}</div>
          </div>
        </div>

        ${order.shipping?.greetingCard ? `
          <div style="background: #FFFDF9; border: 1px dashed #D96B7D; padding: 10px; margin-bottom: 16px; border-radius: 4px;">
            <strong>Lời chúc in thiệp tặng kèm:</strong>
            <p style="font-style: italic; margin: 4px 0 0;">"${order.shipping.greetingCard}"</p>
          </div>
        ` : ""}

        <table class="invoice-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm hoa</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th style="text-align: right;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${order.items?.map((it, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong>${it.name}</strong></td>
                <td>${it.quantity}</td>
                <td>${this.formatCurrency(it.price)}</td>
                <td style="text-align: right;">${this.formatCurrency(it.price * it.quantity)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div class="invoice-totals">
          <div style="display: flex; justify-content: space-between;">
            <span>Tạm tính:</span>
            <span>${this.formatCurrency(order.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Phí giao hàng:</span>
            <span>${order.shippingFee === 0 ? "Miễn phí" : this.formatCurrency(order.shippingFee)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; border-top: 1px solid #000; padding-top: 6px;">
            <span>Tổng cộng:</span>
            <span style="color: var(--color-danger);">${this.formatCurrency(order.total)}</span>
          </div>
          ${order.depositAmount ? `
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-primary);">
              <span>Tiền cọc trước (50%):</span>
              <span><strong>${this.formatCurrency(order.depositAmount)}</strong></span>
            </div>
          ` : ""}
          ${order.remainAmount ? `
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--color-warning);">
              <span>Cần thu shipper khi nhận (COD):</span>
              <span>${this.formatCurrency(order.remainAmount)}</span>
            </div>
          ` : ""}
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 0.85rem; color: var(--admin-text-muted); border-top: 1px dashed var(--admin-border); padding-top: 14px;">
          Cảm ơn bạn đã tin tưởng Douple Flower Shop! Hoa kẽm nhung thủ công bền vĩnh cửu theo thời gian.
        </div>
      </div>
    `;

    setTimeout(() => {
      window.print();
    }, 200);
  },

  // ================= 5. BẢNG YÊU CẦU LÀM THEO MẪU =================
  renderCustomRequestsTable() {
    const tbody = document.getElementById("customRequestsTableBody");
    if (!tbody) return;

    if (this.customRequests.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">
            Chưa có yêu cầu làm hoa riêng nào
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.customRequests.map(r => `
      <tr>
        <td>
          <strong style="font-family: monospace; color: var(--color-primary);">${r.id}</strong>
          <div style="font-size: 0.75rem; color: var(--admin-text-light);">${new Date(r.createdAt).toLocaleDateString("vi-VN")}</div>
        </td>
        <td>
          <strong>${r.customerName}</strong>
          <div style="font-size: 0.8rem; color: var(--admin-text-muted);">
            <a href="tel:${r.customerPhone}" style="color: var(--color-primary);"><i class="bi bi-telephone"></i> ${r.customerPhone}</a>
          </div>
        </td>
        <td>
          <strong>${r.flowerType}</strong> (${r.colorTheme})
          <div style="font-size: 0.78rem; color: var(--admin-text-muted);">Kiểu gói: ${r.packaging}</div>
          ${r.accessories?.length ? `<div style="font-size: 0.75rem; color: var(--color-rose);">Phụ kiện: ${r.accessories.join(", ")}</div>` : ""}
        </td>
        <td>
          <strong style="color: var(--color-primary);">${r.budget}</strong>
          <div style="font-size: 0.78rem; color: var(--admin-text-muted);">Dịp: ${r.occasion || "Tự thưởng"}</div>
        </td>
        <td>
          ${r.imagePreview ? `
            <img src="${r.imagePreview}" alt="Ảnh mẫu" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover; cursor: pointer; border: 1px solid var(--admin-border);" onclick="AdminApp.previewImage('${r.imagePreview}')">
          ` : `<span style="font-size: 0.75rem; color: var(--admin-text-light);">Không có ảnh</span>`}
        </td>
        <td>
          <div class="table-actions">
            <a href="https://zalo.me/${r.customerPhone}" target="_blank" class="btn-table-action" title="Nhắn tin Zalo chốt mẫu">
              <i class="bi bi-chat-dots-fill"></i>
            </a>
            <button class="btn-table-action" onclick="AdminApp.openCustomReqDetail('${r.id}')" title="Xem chi tiết">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn-table-action danger" onclick="AdminApp.deleteCustomReq('${r.id}')" title="Xoá">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  },

  previewImage(imgSrc) {
    const modal = document.getElementById("imagePreviewModal");
    const img = document.getElementById("imagePreviewModalImg");
    if (modal && img) {
      img.src = imgSrc;
      modal.classList.add("active");
    }
  },

  openCustomReqDetail(reqId) {
    const r = this.customRequests.find(x => x.id === reqId);
    if (!r) return;

    alert(`Chi tiết yêu cầu ${r.id}:\n- Khách hàng: ${r.customerName} (${r.customerPhone})\n- Loại hoa: ${r.flowerType}\n- Tone màu: ${r.colorTheme}\n- Kiểu gói: ${r.packaging}\n- Ngân sách: ${r.budget}\n- Ngày cần nhận: ${r.deliveryDate || "Càng sớm càng tốt"}\n- Ghi chú: ${r.notes || "Không có"}`);
  },

  deleteCustomReq(reqId) {
    if (!confirm(`Xoá yêu cầu ${reqId}?`)) return;
    this.customRequests = this.customRequests.filter(r => r.id !== reqId);
    localStorage.setItem("douple_custom_requests", JSON.stringify(this.customRequests));
    this.renderCustomRequestsTable();
    this.renderStats();
    this.showToast("Đã xoá yêu cầu thiết kế riêng", "info");
  },

  // ================= 6. BẢNG SẢN PHẨM =================
  renderProductsTable() {
    const tbody = document.getElementById("productsTableBody");
    if (!tbody) return;

    if (this.products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">
            Chưa có sản phẩm nào. Hãy bấm "Thêm Mẫu Hoa Mới" ở trên để đăng sản phẩm.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.products.map(p => {
      const imgCount = (p.images && Array.isArray(p.images)) ? p.images.length : 1;
      return `
        <tr>
          <td>
            <div class="table-image-stack" style="position: relative; display: inline-block; cursor: pointer;" onclick="AdminApp.openEditProductModal('${p.id}')" title="Bấm để chỉnh sửa & xem bộ ${imgCount} ảnh">
              <img src="${p.image}" alt="${p.name}" style="width: 52px; height: 52px; border-radius: 8px; object-fit: cover; border: 1.5px solid var(--admin-border); display: block;">
              <span class="table-image-count" style="position: absolute; bottom: -4px; right: -4px; background: var(--color-primary); color: #FFFFFF; font-size: 0.65rem; font-weight: 700; padding: 1px 6px; border-radius: 10px; border: 1px solid #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                <i class="bi bi-images" style="font-size: 0.6rem;"></i> ${imgCount}
              </span>
            </div>
          </td>
          <td>
            <strong style="color: var(--color-primary); font-size: 0.95rem;">${p.name}</strong>
            <div style="font-size: 0.78rem; color: var(--admin-text-muted); margin-top: 2px;">
              <span class="badge" style="background: #F1F5F9; color: #475569; padding: 2px 6px; border-radius: 4px;">${p.categoryName || 'Hoa Kẽm Nhung'}</span>
              <span style="font-family: monospace; margin-left: 6px; color: var(--admin-text-light);">Mã: ${p.id}</span>
            </div>
          </td>
          <td>
            <strong style="color: var(--color-danger); font-size: 0.95rem;">${this.formatCurrency(p.price)}</strong>
            ${p.originalPrice && p.originalPrice > p.price ? `<div style="font-size: 0.75rem; text-decoration: line-through; color: var(--admin-text-light);">${this.formatCurrency(p.originalPrice)}</div>` : ""}
          </td>
          <td>
            <span class="admin-badge badge-making">${p.badge || "Thủ công"}</span>
          </td>
          <td>
            <span class="admin-badge ${p.inStock !== false ? 'badge-completed' : 'badge-cancelled'}">
              ${p.inStock !== false ? 'Còn hàng' : 'Hết hàng'}
            </span>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-table-action" onclick="AdminApp.openEditProductModal('${p.id}')" title="Sửa thông tin & bộ 5 ảnh sản phẩm">
                <i class="bi bi-pencil-square" style="color: var(--color-primary);"></i>
              </button>
              <button class="btn-table-action" onclick="AdminApp.toggleProductStock('${p.id}')" title="Đổi trạng thái còn/hết hàng">
                <i class="bi bi-arrow-left-right"></i>
              </button>
              <button class="btn-table-action danger" onclick="AdminApp.deleteProduct('${p.id}')" title="Xóa sản phẩm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  },

  toggleProductStock(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return;
    p.inStock = p.inStock === false ? true : false;
    localStorage.setItem("douple_products", JSON.stringify(this.products));
    this.renderProductsTable();
    this.showToast(`Đã đổi trạng thái "${p.name}" thành ${p.inStock ? 'Còn hàng' : 'Hết hàng'}`, "info");
  },

  openAddProductModal() {
    this.currentEditingProductId = null;
    const title = document.getElementById("productModalTitle");
    const subtitle = document.getElementById("productModalSubtitle");
    const submitBtnText = document.getElementById("pSubmitBtnText");
    const editIdInput = document.getElementById("pEditId");

    if (title) title.innerHTML = `<i class="bi bi-flower1" style="color: var(--color-rose);"></i> Thêm Mẫu Hoa Mới Vào Cửa Hàng`;
    if (subtitle) subtitle.textContent = "Điền thông tin và tải lên tối đa 5 ảnh chi tiết của mẫu hoa";
    if (submitBtnText) submitBtnText.textContent = "Thêm Sản Phẩm Mới";
    if (editIdInput) editIdInput.value = "";

    const nameInput = document.getElementById("pName");
    const categoryInput = document.getElementById("pCategory");
    const badgeInput = document.getElementById("pBadge");
    const priceInput = document.getElementById("pPrice");
    const originalPriceInput = document.getElementById("pOriginalPrice");
    const inStockInput = document.getElementById("pInStock");
    const descInput = document.getElementById("pDescription");

    if (nameInput) nameInput.value = "";
    if (categoryInput) categoryInput.value = "hoa-ly";
    if (badgeInput) badgeInput.value = "Mẫu mới 2026";
    if (priceInput) priceInput.value = "";
    if (originalPriceInput) originalPriceInput.value = "";
    if (inStockInput) inStockInput.value = "true";
    if (descInput) descInput.value = "";

    this.editingProductImages = ["assets/bo_hoa_ly_hong.jpg"];
    this.renderImageSlots();

    const modal = document.getElementById("productModal");
    if (modal) modal.classList.add("active");
  },

  openEditProductModal(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.currentEditingProductId = productId;
    const title = document.getElementById("productModalTitle");
    const subtitle = document.getElementById("productModalSubtitle");
    const submitBtnText = document.getElementById("pSubmitBtnText");
    const editIdInput = document.getElementById("pEditId");

    if (title) title.innerHTML = `<i class="bi bi-pencil-square" style="color: var(--color-primary);"></i> Chỉnh Sửa Mẫu Hoa: ${product.name}`;
    if (subtitle) subtitle.textContent = `Mã: ${product.id} · Cập nhật giá bán, thông tin và tối đa 5 ảnh chi tiết`;
    if (submitBtnText) submitBtnText.textContent = "Lưu Cập Nhật Sản Phẩm";
    if (editIdInput) editIdInput.value = product.id;

    const nameInput = document.getElementById("pName");
    const categoryInput = document.getElementById("pCategory");
    const badgeInput = document.getElementById("pBadge");
    const priceInput = document.getElementById("pPrice");
    const originalPriceInput = document.getElementById("pOriginalPrice");
    const inStockInput = document.getElementById("pInStock");
    const descInput = document.getElementById("pDescription");

    if (nameInput) nameInput.value = product.name || "";
    if (categoryInput) categoryInput.value = product.category || "hoa-ly";
    if (badgeInput) badgeInput.value = product.badge || "";
    if (priceInput) priceInput.value = product.price || "";
    if (originalPriceInput) originalPriceInput.value = product.originalPrice || "";
    if (inStockInput) inStockInput.value = (product.inStock !== false) ? "true" : "false";
    if (descInput) descInput.value = product.description || "";

    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      this.editingProductImages = [...product.images];
    } else {
      this.editingProductImages = [product.image || "assets/bo_hoa_ly_hong.jpg"];
    }

    this.renderImageSlots();

    const modal = document.getElementById("productModal");
    if (modal) modal.classList.add("active");
  },

  renderImageSlots() {
    const container = document.getElementById("productImageSlotsGrid");
    const countBadge = document.getElementById("pImagesCountBadge");
    if (!container) return;

    if (countBadge) {
      countBadge.textContent = `${this.editingProductImages.length} / 5 ảnh`;
      countBadge.style.color = this.editingProductImages.length === 5 ? "#059669" : "#475569";
    }

    let html = "";
    for (let i = 0; i < 5; i++) {
      if (i < this.editingProductImages.length) {
        const src = this.editingProductImages[i];
        const isPrimary = (i === 0);
        html += `
          <div class="image-slot filled ${isPrimary ? 'primary-slot' : ''}" title="${isPrimary ? 'Ảnh đại diện chính (Slot 1)' : `Ảnh phụ số ${i+1}`}">
            <img src="${src}" alt="Ảnh ${i+1}" class="image-slot-img">
            ${isPrimary ? `<span class="slot-tag tag-primary">★ Ảnh chính</span>` : `<span class="slot-tag">Ảnh ${i+1}</span>`}
            <div class="slot-hover-actions">
              ${!isPrimary ? `
                <button type="button" class="btn-slot-action btn-make-primary" onclick="AdminApp.makePrimaryImage(${i})" title="Đặt làm ảnh chính đại diện">
                  <i class="bi bi-star-fill"></i>
                </button>
              ` : ''}
              <button type="button" class="btn-slot-action btn-del-slot" onclick="AdminApp.removeImageSlot(${i})" title="Xóa ảnh này">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        `;
      } else if (i === this.editingProductImages.length) {
        html += `
          <div class="image-slot empty" onclick="document.getElementById('pMultiImgFileInput').click()" title="Bấm để tải thêm ảnh từ máy">
            <i class="bi bi-plus-circle-fill" style="color: var(--color-primary); font-size: 1.5rem;"></i>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary); margin-top: 4px;">+ Thêm ảnh</span>
          </div>
        `;
      } else {
        html += `
          <div class="image-slot empty" style="opacity: 0.45; cursor: pointer;" onclick="document.getElementById('pMultiImgFileInput').click()" title="Ô số ${i+1} (Tối đa 5 ảnh)">
            <i class="bi bi-image" style="font-size: 1.25rem; color: #94A3B8;"></i>
            <span style="font-size: 0.72rem; color: #94A3B8;">Ô số ${i+1}</span>
          </div>
        `;
      }
    }

    container.innerHTML = html;
  },

  handleMultiImageUpload(input) {
    if (!input.files || input.files.length === 0) return;

    const remainingSlots = 5 - this.editingProductImages.length;
    if (remainingSlots <= 0) {
      this.showToast("Mỗi sản phẩm chỉ được tải lên tối đa 5 ảnh! Hãy xóa bớt ảnh trước khi tải thêm.", "error");
      input.value = "";
      return;
    }

    const filesToUpload = Array.from(input.files).slice(0, remainingSlots);
    if (input.files.length > remainingSlots) {
      this.showToast(`Bạn chọn ${input.files.length} ảnh. Tiệm đã lấy ${remainingSlots} ảnh để đúng tối đa 5 ảnh!`, "warning");
    }

    let loadedCount = 0;
    filesToUpload.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editingProductImages.push(e.target.result);
        loadedCount++;
        if (loadedCount === filesToUpload.length) {
          this.renderImageSlots();
          this.showToast(`Đã tải lên ${loadedCount} ảnh thành công!`, "success");
        }
      };
      reader.readAsDataURL(file);
    });

    input.value = "";
  },

  addCustomImageUrl() {
    const input = document.getElementById("pCustomImageUrl");
    if (!input) return;
    const url = input.value.trim();
    if (!url) {
      this.showToast("Vui lòng nhập link ảnh hoặc đường dẫn!", "warning");
      return;
    }

    if (this.editingProductImages.length >= 5) {
      this.showToast("Mỗi sản phẩm chỉ được tối đa 5 ảnh!", "error");
      return;
    }

    this.editingProductImages.push(url);
    this.renderImageSlots();
    input.value = "";
    this.showToast("Đã thêm ảnh vào bộ ảnh sản phẩm!", "success");
  },

  addPresetImage(src) {
    if (this.editingProductImages.length >= 5) {
      this.showToast("Mỗi sản phẩm chỉ được tối đa 5 ảnh!", "error");
      return;
    }
    if (this.editingProductImages.includes(src)) {
      this.showToast("Ảnh này đã có trong bộ sưu tập!", "info");
      return;
    }
    this.editingProductImages.push(src);
    this.renderImageSlots();
    this.showToast("Đã thêm ảnh mẫu vào bộ sưu tập!", "success");
  },

  removeImageSlot(index) {
    if (this.editingProductImages.length <= 1) {
      this.showToast("Mỗi mẫu hoa cần có ít nhất 1 ảnh đại diện!", "warning");
      return;
    }
    this.editingProductImages.splice(index, 1);
    this.renderImageSlots();
    this.showToast("Đã xóa ảnh khỏi sản phẩm", "info");
  },

  makePrimaryImage(index) {
    if (index <= 0 || index >= this.editingProductImages.length) return;
    const [img] = this.editingProductImages.splice(index, 1);
    this.editingProductImages.unshift(img);
    this.renderImageSlots();
    this.showToast("Đã đưa ảnh lên làm Ảnh Đại Diện Chính (Slot 1)!", "success");
  },

  saveProductForm(formData) {
    if (this.editingProductImages.length === 0) {
      this.showToast("Vui lòng thêm ít nhất 1 ảnh cho mẫu hoa!", "error");
      return;
    }

    const primaryImage = this.editingProductImages[0];
    const imagesList = [...this.editingProductImages];

    if (formData.editId) {
      // SỬA SẢN PHẨM HIỆN CÓ
      const idx = this.products.findIndex(p => p.id === formData.editId);
      if (idx !== -1) {
        this.products[idx] = {
          ...this.products[idx],
          name: formData.name,
          category: formData.category,
          categoryName: formData.categoryName,
          price: parseInt(formData.price),
          originalPrice: parseInt(formData.originalPrice) || parseInt(formData.price),
          badge: formData.badge,
          inStock: formData.inStock,
          description: formData.description,
          image: primaryImage,
          images: imagesList
        };

        localStorage.setItem("douple_products", JSON.stringify(this.products));
        this.renderProductsTable();
        this.closeModal("productModal");
        this.showToast(`Đã lưu cập nhật cho mẫu hoa "${formData.name}" thành công!`, "success");
      }
    } else {
      // THÊM SẢN PHẨM MỚI
      const newId = "df-" + (this.products.length + 1).toString().padStart(2, "0");
      const newProduct = {
        id: newId,
        name: formData.name,
        category: formData.category,
        categoryName: formData.categoryName,
        price: parseInt(formData.price),
        originalPrice: parseInt(formData.originalPrice) || parseInt(formData.price),
        image: primaryImage,
        images: imagesList,
        badge: formData.badge || "Mới",
        rating: 5.0,
        reviewsCount: 1,
        description: formData.description || "Hoa kẽm nhung thủ công cao cấp tỉ mỉ.",
        features: [
          "Kẽm nhung loại 1 cao cấp mềm mịn",
          "Độ bền vĩnh cửu không phai màu",
          "Tặng kèm thiệp viết tay & túi hoa"
        ],
        inStock: formData.inStock
      };

      this.products.unshift(newProduct);
      localStorage.setItem("douple_products", JSON.stringify(this.products));
      this.renderProductsTable();
      this.closeModal("productModal");
      this.showToast(`Đã thêm mẫu hoa "${newProduct.name}" vào cửa hàng thành công!`, "success");
    }
  },

  deleteProduct(productId) {
    if (!confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) return;
    this.products = this.products.filter(p => p.id !== productId);
    localStorage.setItem("douple_products", JSON.stringify(this.products));
    this.renderProductsTable();
    this.showToast("Đã xoá sản phẩm", "info");
  },

  // ================= 7. CÀI ĐẶT CỬA HÀNG =================
  loadSettingsForm() {
    const s = this.settings;
    const phoneInput = document.getElementById("settingPhone");
    const fbInput = document.getElementById("settingFb");
    const bankNameInput = document.getElementById("settingBankName");
    const bankAccInput = document.getElementById("settingBankAcc");
    const bankOwnerInput = document.getElementById("settingBankOwner");
    const freeShipInput = document.getElementById("settingFreeship");

    if (phoneInput) phoneInput.value = s.phone || "0393 613 156";
    if (fbInput) fbInput.value = s.facebookUrl || "https://web.facebook.com/profile.php?id=61593298393972&locale=vi_VN";
    if (bankNameInput) bankNameInput.value = s.bankInfo?.bankName || "MB Bank (Ngân hàng Quân Đội)";
    if (bankAccInput) bankAccInput.value = s.bankInfo?.accountNumber || "0393613156";
    if (bankOwnerInput) bankOwnerInput.value = s.bankInfo?.accountHolder || "DOUPLE FLOWER SHOP";
    if (freeShipInput) freeShipInput.value = s.freeShippingThreshold || 500000;
  },

  saveSettings() {
    const phone = document.getElementById("settingPhone")?.value || "0393 613 156";
    const fb = document.getElementById("settingFb")?.value || "";
    const bankName = document.getElementById("settingBankName")?.value || "MB Bank";
    const bankAcc = document.getElementById("settingBankAcc")?.value || "0393613156";
    const bankOwner = document.getElementById("settingBankOwner")?.value || "DOUPLE FLOWER SHOP";
    const freeShip = parseInt(document.getElementById("settingFreeship")?.value) || 500000;

    this.settings = {
      ...this.settings,
      phone: phone,
      hotlineFormatted: phone,
      facebookUrl: fb,
      freeShippingThreshold: freeShip,
      bankInfo: {
        bankName: bankName,
        accountNumber: bankAcc,
        accountHolder: bankOwner
      }
    };

    localStorage.setItem("douple_settings", JSON.stringify(this.settings));
    this.showToast("Đã lưu cập nhật cài đặt cửa hàng thành công!", "success");
  },

  // ================= 8. NAVIGATION & SỰ KIỆN =================
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-item-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("data-tab") === tabId);
    });

    document.querySelectorAll(".admin-tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `pane_${tabId}`);
    });

    const titles = {
      overview: "Tổng Quan Hoạt Động Cửa Hàng",
      orders: "Quản Lý Đơn Đặt Hàng & Cọc 50%",
      customRequests: "Quản Lý Yêu Cầu Thiết Kế Hoa Riêng",
      products: "Quản Lý Danh Mục Bó Hoa",
      settings: "Cài Đặt Cửa Hàng & Thanh Toán"
    };

    const topbarTitle = document.getElementById("topbarTitle");
    if (topbarTitle) topbarTitle.textContent = titles[tabId] || "Trang Quản Trị";
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  },

  bindEvents() {
    // Đăng nhập form
    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const pass = document.getElementById("adminPasswordInput").value;
        this.login(pass);
      });
    }

    // Đăng xuất
    const logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => this.logout());

    // Chuyển tab sidebar
    document.querySelectorAll(".nav-item-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.getAttribute("data-tab");
        if (tab) this.switchTab(tab);
      });
    });

    // Lọc trạng thái đơn hàng
    document.querySelectorAll(".order-filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".order-filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentOrderFilter = pill.getAttribute("data-status");
        this.renderOrdersTable();
      });
    });

    // Tìm kiếm đơn hàng
    const orderSearch = document.getElementById("orderSearchInput");
    if (orderSearch) {
      orderSearch.addEventListener("input", (e) => {
        this.currentSearchQuery = e.target.value.trim();
        this.renderOrdersTable();
      });
    }

    // Lưu cài đặt form
    const settingsForm = document.getElementById("settingsForm");
    if (settingsForm) {
      settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveSettings();
      });
    }

    // Modal close buttons & backdrops
    document.querySelectorAll(".admin-modal-close").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        if (modal) modal.classList.remove("active");
      });
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("active");
      });
    });

    // Thêm / Chỉnh sửa sản phẩm form
    const productForm = document.getElementById("productForm");
    if (productForm) {
      productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("pEditId")?.value;
        const name = document.getElementById("pName")?.value.trim();
        const category = document.getElementById("pCategory")?.value;
        const categoryName = document.getElementById("pCategory")?.selectedOptions[0]?.text;
        const price = document.getElementById("pPrice")?.value;
        const originalPrice = document.getElementById("pOriginalPrice")?.value;
        const badge = document.getElementById("pBadge")?.value;
        const inStock = document.getElementById("pInStock")?.value === "true";
        const description = document.getElementById("pDescription")?.value;

        this.saveProductForm({ editId, name, category, categoryName, price, originalPrice, badge, inStock, description });
      });
    }

    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm && !productForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("pName").value.trim();
        const category = document.getElementById("pCategory").value;
        const categoryName = document.getElementById("pCategory").selectedOptions[0].text;
        const price = document.getElementById("pPrice").value;
        const originalPrice = document.getElementById("pOriginalPrice").value;
        const badge = document.getElementById("pBadge").value;
        const description = document.getElementById("pDescription").value;

        this.saveProductForm({ name, category, categoryName, price, originalPrice, badge, inStock: true, description });
      });
    }

    // Lắng nghe sự kiện storage để đồng bộ real-time khi khách đặt đơn từ tab khác
    window.addEventListener("storage", (e) => {
      if (e.key === "douple_orders" || e.key === "douple_custom_requests") {
        this.loadData();
        this.renderStats();
        this.renderOrdersTable();
        this.renderCustomRequestsTable();
        this.playNotificationSound();
        this.showToast("Có đơn hàng hoặc yêu cầu làm hoa mới vừa được cập nhật!", "success");
      }
    });
  },

  refreshData() {
    this.loadData();
    this.renderStats();
    this.renderRevenueChart();
    this.renderOrdersTable();
    this.renderCustomRequestsTable();
    this.renderProductsTable();
    this.showToast("Đã đồng bộ toàn bộ dữ liệu mới nhất!", "success");
  },

  exportOrdersCSV() {
    if (this.orders.length === 0) {
      this.showToast("Không có đơn hàng nào để xuất file!", "error");
      return;
    }

    const headers = [
      "Mã đơn hàng",
      "Ngày đặt",
      "Tên khách hàng",
      "Số điện thoại",
      "Tỉnh / TP",
      "Quận / Huyện",
      "Địa chỉ chi tiết",
      "Danh sách sản phẩm",
      "Tổng tiền (VNĐ)",
      "Tiền cọc 50% (VNĐ)",
      "Còn lại shipper thu (VNĐ)",
      "Phương thức thanh toán",
      "Trạng thái",
      "Lời chúc thiệp"
    ];

    const rows = this.orders.map(ord => {
      const itemsStr = (ord.items || []).map(i => `${i.name} (x${i.quantity})`).join("; ");
      const escape = (str) => `"${(str || "").toString().replace(/"/g, '""')}"`;
      return [
        ord.orderId,
        new Date(ord.createdAt).toLocaleString("vi-VN"),
        escape(ord.shipping?.receiverName),
        escape(ord.shipping?.receiverPhone),
        escape(ord.shipping?.city),
        escape(ord.shipping?.district),
        escape(ord.shipping?.address),
        escape(itemsStr),
        ord.total || 0,
        ord.depositAmount || 0,
        ord.remainAmount || 0,
        escape(ord.paymentNote || ord.paymentMethod),
        escape(ord.status),
        escape(ord.shipping?.greetingCard || "")
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Douple_Flower_Don_Hang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.showToast("Đã xuất file Excel / CSV thành công!", "success");
  },

  handleProductImageUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const pImageInput = document.getElementById("pImage");
        if (pImageInput) pImageInput.value = dataUrl;
        this.updateImagePreview(dataUrl);
        this.showToast("Đã tải ảnh lên thành công!", "info");
      };
      reader.readAsDataURL(file);
    }
  },

  selectPresetImage(src) {
    const input = document.getElementById("pImage");
    if (input) input.value = src;
    this.updateImagePreview(src);
  },

  updateImagePreview(src) {
    const preview = document.getElementById("pImgPreview");
    if (preview) {
      preview.src = src || "assets/bo_hoa_ly_hong.jpg";
    }
  },

  playNotificationSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount || 0);
  },

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#1E3A2F'};
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideInToast 0.3s ease;
    `;
    toast.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'}"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AdminApp.init();
});
