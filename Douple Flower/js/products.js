// Danh mục và sản phẩm Douple Flower Shop - Tiệm hoa Handmade
const PRODUCTS_DATA = [
  {
    id: "df-01",
    name: "Bó Hoa Ly Kẽm Nhung Hồng Pastel",
    category: "hoa-ly",
    categoryName: "Hoa Ly Kẽm Nhung",
    price: 380000,
    originalPrice: 450000,
    image: "assets/bo_hoa_ly_hong.jpg",
    images: [
      "assets/bo_hoa_ly_hong.jpg",
      "assets/bo_hoa_ly_xanh.jpg",
      "assets/hop_hoa_kim_tuyen.jpg"
    ],
    badge: "Bán chạy nhất",
    rating: 5.0,
    reviewsCount: 48,
    isHot: true,
    tag: "Bestseller",
    description: "Bó hoa ly kẽm nhung hồng pastel được uốn thủ công tỉ mỉ từng cánh hoa mềm mại, điểm xuyết hoa cúc hoạ mi trắng tinh khôi và lá xanh nhung dịu mát. Gói giấy kraft kem vân nếp cao cấp Hàn Quốc cùng dải ruy băng lụa hồng trang nhã.",
    features: [
      "Kẽm nhung loại 1 cao cấp, sợi bông xù mềm mịn không xơ",
      "Độ bền vĩnh cửu, không phai màu, không héo",
      "Kích thước: Chiều cao ~45cm, đường kính tán hoa ~30cm",
      "Tặng kèm: Thiệp chúc mừng viết tay nghệ thuật & túi đựng hoa trong suốt"
    ],
    inStock: true
  },
  {
    id: "df-02",
    name: "Bó Hoa Ly Kẽm Nhung Xanh Baby Dịu Dàng",
    category: "hoa-ly",
    categoryName: "Hoa Ly Kẽm Nhung",
    price: 390000,
    originalPrice: 460000,
    image: "assets/bo_hoa_ly_xanh.jpg",
    images: [
      "assets/bo_hoa_ly_xanh.jpg",
      "assets/bo_hoa_ly_hong.jpg",
      "assets/bo_hoa_tulip_pastel.jpg"
    ],
    badge: "Mẫu mới 2026",
    rating: 4.9,
    reviewsCount: 36,
    isHot: true,
    tag: "New Arrival",
    description: "Sự kết hợp tinh tế giữa tone xanh baby pastel ngọt ngào của hoa ly nhung và hoa cúc baby trắng. Gói bằng giấy tổ ong màu vàng bơ nghệ thuật tạo vẻ đẹp hiện đại, thanh tao và bình yên.",
    features: [
      "Màu xanh baby độc quyền phối chuẩn tone pastel Hàn Quốc",
      "Thích hợp làm quà tặng sinh nhật, người thương, bạn thân",
      "Kích thước: Chiều cao ~42cm, tán hoa ~28cm",
      "Miễn phí in tag tên và thông điệp riêng theo yêu cầu"
    ],
    inStock: true
  },
  {
    id: "df-03",
    name: "Hộp Trụ Hoa Ly Kẽm Nhung Kim Tuyến Kèm Đèn LED",
    category: "hop-hoa",
    categoryName: "Hộp Hoa Cao Cấp",
    price: 520000,
    originalPrice: 620000,
    image: "assets/hop_hoa_kim_tuyen.jpg",
    images: [
      "assets/hop_hoa_kim_tuyen.jpg",
      "assets/bo_hoa_ly_hong.jpg",
      "assets/bo_hoa_hong_do.jpg"
    ],
    badge: "Hot Trend",
    rating: 5.0,
    reviewsCount: 62,
    isHot: true,
    tag: "Premium Gift",
    description: "Thiết kế hộp tròn vintage cao cấp thêu chữ thủ công, phối hoa ly nhung hồng fuchsia và hồng phấn phủ nhũ kim tuyến lấp lánh. Tích hợp dàn đèn LED đom đóm 3 chế độ sáng cực kỳ lung linh trong đêm.",
    features: [
      "Hộp trụ da/giấy cứng ép kim sang trọng, nơ ren vintage",
      "Tích hợp sẵn dây đèn LED Fairy Light pin cúc áo thay được",
      "Cánh hoa nhũ óng ánh bắt sáng lung linh",
      "Kích thước: Đường kính hộp 18cm, chiều cao tổng 32cm"
    ],
    inStock: true
  },
  {
    id: "df-04",
    name: "Bó Hoa Tulip Kẽm Nhung Đa Sắc Ngọt Ngào",
    category: "hoa-tulip",
    categoryName: "Hoa Tulip",
    price: 350000,
    originalPrice: 420000,
    image: "assets/bo_hoa_tulip_pastel.jpg",
    images: [
      "assets/bo_hoa_tulip_pastel.jpg",
      "assets/bo_huong_duong.jpg",
      "assets/bo_hoa_ly_hong.jpg"
    ],
    badge: "Yêu thích",
    rating: 4.9,
    reviewsCount: 51,
    isHot: false,
    tag: "Sweet Pastel",
    description: "Bó gồm 15 bông hoa tulip kẽm nhung mix 2 tone màu vàng bơ ấm áp và hồng ombre chuyển sắc. Cánh hoa uốn cong duyên dáng, gói giấy mờ sương trắng phong cách công chúa nhẹ nhàng.",
    features: [
      "Ý nghĩa tượng trưng cho tình yêu chân thành và niềm hy vọng",
      "Giấy gói mờ Hàn Quốc chống thấm nước cao cấp",
      "Kích thước: Chiều cao ~40cm, tán hoa ~26cm",
      "Thích hợp tặng sinh nhật, chụp kỷ yếu, decor phòng ngủ"
    ],
    inStock: true
  },
  {
    id: "df-05",
    name: "Bó Hoa Hướng Dương Kẽm Nhung Rực Rỡ (Tốt Nghiệp)",
    category: "tot-nghiep",
    categoryName: "Hoa Tốt Nghiệp",
    price: 420000,
    originalPrice: 490000,
    image: "assets/bo_huong_duong.jpg",
    images: [
      "assets/bo_huong_duong.jpg",
      "assets/bo_hoa_tulip_pastel.jpg",
      "assets/bo_hoa_hong_do.jpg"
    ],
    badge: "Quà Tốt Nghiệp",
    rating: 5.0,
    reviewsCount: 79,
    isHot: true,
    tag: "Graduation",
    description: "Bó hoa hướng dương kẽm nhung vàng tươi rực rỡ, nhuỵ hoa đan tỉ mỉ tạo hiệu ứng 3D chân thực, phối cùng cành khuynh diệp và cúc hoạ mi. Gói giấy đen viền vàng sang trọng cùng tag chúc mừng Congratulations.",
    features: [
      "Tượng trưng cho tương lai tươi sáng và sự thành công",
      "Tặng kèm nón cử nhân mini đính kèm hoa & tag thiệp tốt nghiệp",
      "Kích thước: Chiều cao ~48cm, tán hoa ~32cm",
      "Chất liệu bền đẹp lưu giữ kỷ niệm ngày tốt nghiệp suốt nhiều năm"
    ],
    inStock: true
  },
  {
    id: "df-06",
    name: "Bó Hoa Hồng Đỏ Kẽm Nhung Quý Phái Velvet Rose",
    category: "hoa-hong",
    categoryName: "Hoa Hồng Nhung",
    price: 450000,
    originalPrice: 530000,
    image: "assets/bo_hoa_hong_do.jpg",
    images: [
      "assets/bo_hoa_hong_do.jpg",
      "assets/bo_hoa_ly_hong.jpg",
      "assets/hop_hoa_kim_tuyen.jpg"
    ],
    badge: "Tình Yêu",
    rating: 5.0,
    reviewsCount: 84,
    isHot: true,
    tag: "Romantic",
    description: "Bó hoa hồng đỏ nhung quyến rũ 9 bông tượng trưng cho tình yêu vĩnh cửu. Tone đỏ ruby quý phái kết hợp lớp giấy gói 2 mặt đen và đỏ mận, thắt nơ ruy băng satin đen quyền lực.",
    features: [
      "Chất liệu nhung dày dặn, form hoa cúp tròn tự nhiên như hoa thật",
      "Món quà hoàn hảo cho dịp Valentine, Kỷ niệm ngày yêu, Cầu hôn",
      "Kích thước: Chiều cao ~46cm, tán hoa ~30cm",
      "Miễn phí xịt hương hoa thơm dịu nhẹ lưu hương 30 ngày"
    ],
    inStock: true
  }
];

// Danh mục hoa
const CATEGORIES = [
  { id: "all", name: "Tất cả sản phẩm", icon: "bi-grid-fill" },
  { id: "hoa-ly", name: "Hoa Ly Kẽm Nhung", icon: "bi-flower1" },
  { id: "hoa-tulip", name: "Hoa Tulip", icon: "bi-flower2" },
  { id: "hoa-hong", name: "Hoa Hồng Đỏ", icon: "bi-heart-fill" },
  { id: "tot-nghiep", name: "Hoa Tốt Nghiệp", icon: "bi-mortarboard-fill" },
  { id: "hop-hoa", name: "Hộp Hoa LED Cao Cấp", icon: "bi-box-seam-fill" }
];

// Dịch vụ đặt làm theo yêu cầu options
const CUSTOM_ORDER_OPTIONS = {
  flowerTypes: [
    { id: "ly", name: "Hoa Ly Kẽm Nhung", desc: "Thanh tao, quý phái" },
    { id: "tulip", name: "Hoa Tulip Kẽm Nhung", desc: "Ngọt ngào, nhẹ nhàng" },
    { id: "hong", name: "Hoa Hồng Nhung", desc: "Lãng mạn, nồng nàn" },
    { id: "huongduong", name: "Hoa Hướng Dương", desc: "Rạng rỡ, tương lai sáng" },
    { id: "camtucau", name: "Cẩm Tú Cầu Kẽm Nhung", desc: "Tròn đầy, biết ơn" },
    { id: "mix", name: "Bó Phối Mix Đa Dạng Theo Ý", desc: "Độc đáo, duy nhất" }
  ],
  colorThemes: [
    { id: "pink-pastel", name: "Hồng Pastel", color: "#F7B5CA" },
    { id: "blue-baby", name: "Xanh Baby Pastel", color: "#9AD0EC" },
    { id: "yellow-warm", name: "Vàng Nắng Rực Rỡ", color: "#FCE38A" },
    { id: "red-ruby", name: "Đỏ Ruby Quyến Rũ", color: "#C70039" },
    { id: "purple-lavender", name: "Tím Mộng Mơ", color: "#D1C4E9" },
    { id: "cream-minimal", name: "Kem Vintage Tinh Khôi", color: "#F7E6C4" }
  ],
  packagingStyles: [
    { id: "korean-paper", name: "Bó Giấy Hàn Quốc Mờ / Vân Nếp", priceNote: "Chuẩn thanh lịch" },
    { id: "vintage-box", name: "Hộp Trụ Vintage Có Quai Xách", priceNote: "+40.000đ" },
    { id: "honeycomb", name: "Gói Giấy Tổ Ong Bồ Đào Nha", priceNote: "+25.000đ" },
    { id: "wooden-basket", name: "Giỏ Gỗ Mộc Kèm Nơ Ren", priceNote: "+50.000đ" },
    { id: "pressed-frame", name: "Khung Tranh Kính Gỗ Hoa Ép Cánh", priceNote: "+70.000đ" }
  ],
  accessories: [
    { id: "led-light", name: "Dây Đèn LED Đom Đóm Phát Sáng", price: 25000 },
    { id: "mini-bear", name: "Gấu Bông Cử Nhân / Mini Đính Kèm", price: 35000 },
    { id: "handwritten-card", name: "Thiệp Hoa Khô Viết Tay Theo Yêu Cầu", price: 0, free: true },
    { id: "clear-bag", name: "Túi Kính Quai Trắng Trong Suốt Cao Cấp", price: 20000 }
  ],
  budgets: [
    "Từ 250.000đ - 400.000đ",
    "Từ 400.000đ - 650.000đ",
    "Từ 650.000đ - 1.000.000đ",
    "Thiết kế cao cấp trên 1.000.000đ"
  ],
  occasions: [
    "Sinh nhật",
    "Lễ Tốt nghiệp (Graduation)",
    "Ngày Phụ nữ (8/3 - 20/10)",
    "Ngày lễ Tình nhân (Valentine)",
    "Kỷ niệm ngày cưới / Ngày yêu",
    "Tri ân Thầy Cô (20/11)",
    "Trang trí phòng / Tự thưởng bản thân"
  ]
};

// Thông tin cửa hàng
const STORE_INFO = {
  name: "Douple Flower Shop - Tiệm hoa Handmade",
  slogan: "Những bó hoa nhỏ - Gửi trao yêu thương lớn",
  phone: "0393 613 156",
  hotlineFormatted: "0393.613.156",
  zalo: "https://zalo.me/0393613156",
  facebookUrl: "https://web.facebook.com/profile.php?id=61593298393972&locale=vi_VN",
  facebookId: "61593298393972",
  address: "Douple Flower Workshop - Giao hàng toàn quốc",
  shippingFee: 30000,
  freeShippingThreshold: 500000,
  bankInfo: {
    bankName: "MB Bank (Ngân hàng Quân Đội)",
    accountNumber: "0393613156",
    accountHolder: "DOUPLE FLOWER SHOP",
    branch: "Hà Nội"
  }
};

// Tự động đồng bộ số điện thoại và STK mới nhất vào localStorage nếu đang lưu số cũ
(function syncStoreSettings() {
  try {
    const raw = localStorage.getItem("douple_settings");
    if (raw) {
      const s = JSON.parse(raw);
      if (s.phone === "0968 839 972" || s.bankInfo?.accountNumber === "0968839972") {
        s.phone = "0393 613 156";
        s.hotlineFormatted = "0393.613.156";
        s.zalo = "https://zalo.me/0393613156";
        if (s.bankInfo) s.bankInfo.accountNumber = "0393613156";
        localStorage.setItem("douple_settings", JSON.stringify(s));
      }
    } else {
      localStorage.setItem("douple_settings", JSON.stringify(STORE_INFO));
    }
  } catch (e) {}
})();

// ================= HÀM ĐỒNG BỘ SẢN PHẨM REAL-TIME =================
function getStoreProducts() {
  try {
    const raw = localStorage.getItem("douple_products");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => {
          if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
            p.images = [p.image || "assets/bo_hoa_ly_hong.jpg"];
          }
          if (!p.image && p.images.length > 0) {
            p.image = p.images[0];
          }
          return p;
        });
      }
    }
  } catch (e) {}

  // Khởi tạo lần đầu nếu chưa có trong localStorage
  try {
    localStorage.setItem("douple_products", JSON.stringify(PRODUCTS_DATA));
  } catch (e) {}
  return PRODUCTS_DATA;
}

function saveStoreProducts(products) {
  try {
    localStorage.setItem("douple_products", JSON.stringify(products));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Không thể lưu danh mục sản phẩm vào localStorage:", e);
  }
}

// ================= HỆ THỐNG PHÔNG CHỮ & THEME CHUẨN SALE =================
const DEFAULT_TYPOGRAPHY = {
  headingFont: "Playfair Display",
  bodyFont: "Be Vietnam Pro",
  baseFontSize: 16,
  headingWeight: "700",
  headingLetterSpacing: "0.5",
  headingTransform: "none",
  headingColor: "#1E3A2F",
  accentColor: "#D96B7D",
  topPromoText: "<strong>Douple Flower Shop:</strong> Những bó hoa nhỏ - Gửi trao yêu thương lớn · Miễn phí giao hàng cho đơn từ 500.000đ",
  heroTitleText: "Douple Flower Shop",
  heroSubtitleText: "Tiệm hoa kẽm nhung & hoa ép cánh thủ công tỉ mỉ. Từng cánh hoa bền vĩnh cửu gửi trao yêu thương trọn vẹn."
};

function getStoreTypography() {
  try {
    const raw = localStorage.getItem("douple_typography");
    if (raw) {
      return { ...DEFAULT_TYPOGRAPHY, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return DEFAULT_TYPOGRAPHY;
}

function applyStoreTypography(typo) {
  const t = typo || getStoreTypography();
  const root = document.documentElement;

  if (t.headingFont) {
    root.style.setProperty("--font-serif", `'${t.headingFont}', serif`);
    root.style.setProperty("--font-heading", `'${t.headingFont}', serif`);
  }
  if (t.bodyFont) {
    root.style.setProperty("--font-sans", `'${t.bodyFont}', sans-serif`);
    root.style.setProperty("--font-body", `'${t.bodyFont}', sans-serif`);
  }
  if (t.baseFontSize) {
    root.style.setProperty("--font-size-base", `${t.baseFontSize}px`);
  }
  if (t.headingWeight) {
    root.style.setProperty("--heading-weight", t.headingWeight);
  }
  if (t.headingLetterSpacing !== undefined) {
    root.style.setProperty("--heading-letter-spacing", `${t.headingLetterSpacing}px`);
  }
  if (t.headingTransform) {
    root.style.setProperty("--heading-transform", t.headingTransform);
  }
  if (t.headingColor) {
    root.style.setProperty("--color-primary", t.headingColor);
  }
  if (t.accentColor) {
    root.style.setProperty("--color-rose", t.accentColor);
  }

  // Tự động cập nhật tiêu đề, slogan trực tiếp nếu trang có chứa
  const promoEl = document.querySelector(".top-bar-promo span");
  if (promoEl && t.topPromoText) promoEl.innerHTML = t.topPromoText;

  const heroTitleEl = document.querySelector(".hero-banner-content h1, .hero-showcase-title, .hero-title");
  if (heroTitleEl && t.heroTitleText) heroTitleEl.textContent = t.heroTitleText;

  const heroSubEl = document.querySelector(".hero-banner-content p, .hero-showcase-sub, .hero-subtitle");
  if (heroSubEl && t.heroSubtitleText) heroSubEl.textContent = t.heroSubtitleText;
}

// Khởi chạy áp dụng phông chữ ngay khi load script
applyStoreTypography();


