export const links = {
  // Authentication
  login: { href: '/login', label: 'Đăng nhập' },
  logout: { href: '/logout', label: 'Đăng xuất' },
  register: { href: '/register', label: 'Đăng ký' },
  resetPassword: { href: '/reset-password', label: 'Đặt lại mật khẩu' },
  forgotPassword: { href: '/forgot-password', label: 'Quên mật khẩu' },
  accountConfirm: { href: '/account-confirm', label: 'Xác thực tài khoản' },

  // Main navigation
  home: { href: '/', label: 'Trang chủ' },
  tour: { href: '/tour', label: 'Tour Quy Nhơn' },
  allTour: { href: '/tour/all', label: 'Tất cả tour' },
  blog: { href: '/blog', label: 'Cẩm nang du lịch' },
  about: { href: '/about', label: 'Về chúng tôi' },

  // User profile
  profile: { href: '/profile', label: 'Khách hàng' },
  bookings: { href: '/my-bookings', label: 'Lịch sử đặt tour' },
  review: { href: '/my-review', label: 'Đánh giá' },
  rating: { href: '/my-review/rating', label: 'Đánh giá' },
  account: { href: '/my-account', label: 'Cài đặt tài khoản' },
  privacy: { href: '/privacy', label: 'Chính sách bảo mật' },
  wallet: { href: '/my-wallet', label: 'Ví của tôi' },
  otpQrSetup: { href: '/my-wallet/otp-setup', label: 'Thiết lập xác thực OTP' },

  // Shopping
  shoppingCart: { href: '/shoppingcart', label: 'Giỏ hàng' },
  checkout: { href: '/checkout', label: 'Thanh toán' },
  paymentCancel: { href: '/payment/cancel', label: 'Hủy thanh toán' },
  paymentSuccess: { href: '/payment/success', label: 'Thanh toán thành công' },
}; 