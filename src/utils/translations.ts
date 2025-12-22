// Cấu trúc translations - dễ dàng mở rộng thêm ngôn ngữ mới
export interface Translations {
  common: {
    search: string;
    profile: string;
    settings: string;
    help: string;
    logout: string;
    fullscreen: string;
    messages: string;
    notifications: string;
    viewAll: string;
    language: string;
    user: string;
    searchPlaceholder: string;
    searchBy: string;
    // Actions
    save: string;
    cancel: string;
    delete: string;
    editAction: string;
    add: string;
    create: string;
    update: string;
    submit: string;
    confirm: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    view: string;
    detailsAction: string;
    actions: string;
    // Status
    status: string;
    active: string;
    inactive: string;
    success: string;
    error: string;
    loading: string;
    yes: string;
    no: string;
    ok: string;
    // Login
    providerOperatorPortal: string;
    login: string;
    welcome: string;
    emailOrUsername: string;
    password: string;
    forgotPassword: string;
    loggingIn: string;
      // Messages
      pleaseFillAllFields: string;
      loginSuccess: string;
      loginFailed: string;
      checkLoginInfo: string;
      // Table & List
      filter: string;
      noData: string;
      loadingData: string;
      showing: string;
      to: string;
      of: string;
      page: string;
      // Status
      paused: string;
      banned: string;
      suspicious: string;
      // Actions
      creating: string;
      deleting: string;
      updating: string;
      saving: string;
      // Forms
      name: string;
      email: string;
      code: string;
      description: string;
      phone: string;
      username: string;
      // Modals
      addNew: string;
      confirmDelete: string;
      deleteConfirmMessage: string;
      // Placeholders
      enterName: string;
      enterEmail: string;
      enterGameName: string;
      enterProviderAccountEmail: string;
      // Details
      createdAt: string;
      lastLogin: string;
      neverLoggedIn: string;
      additionalInfo: string;
      edit: string;
      // Dashboard
      overview: string;
      increased: string;
      decreased: string;
      weeklySales: string;
      weeklyOrders: string;
      visitorsOnline: string;
      visitAndSalesStatistics: string;
      trafficSources: string;
      searchEngines: string;
      directClick: string;
      bookmarksClick: string;
      recentTickets: string;
      assignee: string;
      subject: string;
      lastUpdate: string;
      trackingId: string;
      done: string;
  };
  pages: {
    dashboard: {
      title: string;
      overview: string;
      weeklySales: string;
      weeklyOrders: string;
      visitorsOnline: string;
      visitAndSalesStatistics: string;
      trafficSources: string;
      searchEngines: string;
      directClick: string;
      bookmarksClick: string;
      recentTickets: string;
      assignee: string;
      subject: string;
      lastUpdate: string;
      trackingId: string;
      done: string;
      increased: string;
      decreased: string;
    };
      operators: {
        title: string;
        addOperator: string;
        createOperator: string;
        deleteOperator: string;
        operatorDetails: string;
        searchPlaceholder: string;
        createSuccess: string;
        createFailed: string;
        deleteSuccess: string;
        deleteFailed: string;
        viewDetails: string;
        deleteOperatorTitle: string;
        description: string;
        noOperatorsFound: string;
        noOperatorsYet: string;
        operatorCode: string;
        operatorName: string;
        enterOperatorCode: string;
        enterOperatorName: string;
        randomData: string;
        random: string;
        edit: string;
        userNotFound: string;
        operatorsLabel: string;
      };
    games: {
      title: string;
      addGame: string;
      createGame: string;
      searchPlaceholder: string;
      description: string;
    };
      providerAccounts: {
        title: string;
        addAccount: string;
        createAccount: string;
        deleteAccount: string;
        searchPlaceholder: string;
        createSuccess: string;
        createFailed: string;
        deleteSuccess: string;
        deleteFailed: string;
        deleteAccountTitle: string;
        description: string;
        totalAccounts: string;
        activeAccounts: string;
        loadingAccounts: string;
        providerAccount: string;
        noAccountsFound: string;
        noAccountsYet: string;
        randomData: string;
        random: string;
      };
    roles: {
      title: string;
      addRole: string;
      createRole: string;
      deleteRole: string;
      searchPlaceholder: string;
      createSuccess: string;
      createFailed: string;
      deleteSuccess: string;
      deleteFailed: string;
      role: string;
      permissions: string;
      noRolesFound: string;
      noRolesYet: string;
      loadingRoles: string;
      loadingPermissions: string;
      operatorAccounts: string;
      operatorAccount: string;
      selectPermissions: string;
    };
    permissions: {
      title: string;
      addPermission: string;
      createPermission: string;
      deletePermission: string;
      searchPlaceholder: string;
      createSuccess: string;
      createFailed: string;
      deleteSuccess: string;
      deleteFailed: string;
    };
    wallet: {
      title: string;
      addMethod: string;
      totalMethods: string;
      activeMethods: string;
      totalDailyLimit: string;
      dailyLimit: string;
      monthlyLimit: string;
      bank: string;
      ewallet: string;
      gateway: string;
      description: string;
    };
    promotions: {
      title: string;
      createPromotion: string;
      totalPrograms: string;
      ongoing: string;
      totalParticipants: string;
      totalBonusAwarded: string;
      programName: string;
      bonus: string;
      maxBonus: string;
      participants: string;
      startDate: string;
      endDate: string;
      firstDeposit: string;
      deposit: string;
      cashback: string;
      tournament: string;
      rebate: string;
      upcoming: string;
      expired: string;
      to: string;
      description: string;
    };
    transactions: {
      title: string;
      searchPlaceholder: string;
      exportReport: string;
      totalTransactionsToday: string;
      totalDeposit: string;
      totalWithdraw: string;
      pendingProcessing: string;
      transactionCode: string;
      amount: string;
      paymentMethod: string;
      time: string;
      deposit: string;
      withdraw: string;
      bet: string;
      completed: string;
      rejected: string;
      description: string;
    };
    auditLogs: {
      title: string;
      searchPlaceholder: string;
      description: string;
      exportLogs: string;
      time: string;
      user: string;
      action: string;
      resource: string;
      ipAddress: string;
      login: string;
      logout: string;
      updatePlayer: string;
      createPromotion: string;
      deleteGame: string;
      changeSettings: string;
      viewSensitiveData: string;
    };
    settings: {
      title: string;
      saveSettings: string;
      generalSettings: string;
      notificationSettings: string;
      securitySettings: string;
      paymentSettings: string;
      systemName: string;
      systemDescription: string;
      defaultLanguage: string;
      emailNotification: string;
      emailNotificationDesc: string;
      pushNotification: string;
      pushNotificationDesc: string;
      smsAlert: string;
      smsAlertDesc: string;
      security: string;
      sessionTimeout: string;
      maxLoginAttempts: string;
      require2FA: string;
      require2FADesc: string;
      minDepositLimit: string;
      minWithdrawLimit: string;
      withdrawProcessingTime: string;
      description: string;
    };
    api: {
      title: string;
      createApiKey: string;
      description: string;
      totalApiKeys: string;
      activeKeys: string;
      totalRequestsToday: string;
      avgResponseTime: string;
      apiKeys: string;
      apiKey: string;
      lastUsed: string;
      requests: string;
      rateLimit: string;
      apiEndpoints: string;
      method: string;
      path: string;
      callsToday: string;
      avgResponse: string;
    };
    alerts: {
      totalAlerts: string;
      unread: string;
      warning: string;
      totalAlertsLabel: string;
      description: string;
    };
    monitoring: {
      online: string;
      offline: string;
      warning: string;
      systemStatus: string;
      service: string;
      uptime: string;
      latency: string;
      avgUptime: string;
      totalServices: string;
      recentEvents: string;
      description: string;
    };
    risk: {
      totalAlerts: string;
      fraud: string;
      unusualPattern: string;
      accountCompromise: string;
      pending: string;
      investigating: string;
      resolved: string;
      critical: string;
      high: string;
      medium: string;
      low: string;
      lockedAccounts: string;
      type: string;
      severity: string;
      time: string;
      title: string;
      description: string;
    };
    analytics: {
      registration: string;
      firstDeposit: string;
      playGame: string;
      activeUsers: string;
      revenuePerDay: string;
      sessions: string;
      conversionRate: string;
      performanceLast5Days: string;
      conversionRateChart: string;
      revenueTrend: string;
      comparedToYesterday: string;
      description: string;
    };
    reports: {
      exportPdf: string;
      exportExcel: string;
      monthlyRevenue: string;
      profit: string;
      revenueByMonth: string;
      revenue: string;
      winRate: string;
      comparedToLastMonth: string;
      description: string;
    };
      players: {
        totalPlayers: string;
        activePlayers: string;
        inactivePlayers: string;
        totalBalance: string;
        username: string;
        balance: string;
        registrationDate: string;
        description: string;
      };
      profile: {
        description: string;
        personalInfo: string;
        accountSecurity: string;
        changePassword: string;
        changePasswordDesc: string;
        twoFactorAuth: string;
        twoFactorAuthDesc: string;
        changePhoto: string;
      };
      userSettings: {
        description: string;
        notifications: string;
        appearance: string;
        privacy: string;
        emailNotifications: string;
        emailNotificationsDesc: string;
        pushNotifications: string;
        pushNotificationsDesc: string;
        smsNotifications: string;
        smsNotificationsDesc: string;
        language: string;
        theme: string;
        light: string;
        dark: string;
        auto: string;
        showEmail: string;
        showEmailDesc: string;
        showPhone: string;
        showPhoneDesc: string;
      };
      tables: {
        id: string;
        player: string;
        type: string;
        severity: string;
        description: string;
        status: string;
        time: string;
        actions: string;
        service: string;
        uptime: string;
        latency: string;
        players: string;
        gameName: string;
        revenue: string;
        totalWagered: string;
        game: string;
        wagered: string;
      };
    };
  header: {
    providerPortal: string;
    operatorPortal: string;
    myProfile: string;
    helpSupport: string;
  };
  menu: {
    dashboard: string;
    gamesManagement: string;
    operatorsManagement: string;
    providerAccountsManagement: string;
    rolesPermissionsManagement: string;
    playersManagement: string;
    transactions: string;
    walletPayment: string;
    promotionsBonus: string;
    reports: string;
    analytics: string;
    monitoring: string;
    riskManagement: string;
    apiManagement: string;
    alerts: string;
    auditLogs: string;
    systemSettings: string;
  };
  languages: {
    en: string;
    vi: string;
    zh: string;
    th: string;
    ja: string;
    ko: string;
  };
}

// Định nghĩa các ngôn ngữ được hỗ trợ
export type SupportedLanguage = 'en' | 'vi' | 'zh' | 'th' | 'ja' | 'ko';

// Translations cho từng ngôn ngữ
const translations: Record<SupportedLanguage, Translations> = {
  en: {
    common: {
      search: 'Search',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout',
      fullscreen: 'Fullscreen',
      messages: 'Messages',
      notifications: 'Notifications',
      viewAll: 'View All',
      language: 'Language',
      user: 'User',
      searchPlaceholder: 'Search...',
      searchBy: 'Search by',
      // Actions
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      editAction: 'Edit',
      detailsAction: 'Details',
      add: 'Add',
      create: 'Create',
      update: 'Update',
      submit: 'Submit',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      view: 'View',
      actions: 'Actions',
      // Status
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      success: 'Success',
      error: 'Error',
      loading: 'Loading',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      // Login
      providerOperatorPortal: 'Provider & Operator Portal',
      login: 'Login',
      welcome: 'Welcome back!',
      emailOrUsername: 'Email or Username',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      loggingIn: 'Logging in...',
      // Messages
      pleaseFillAllFields: 'Please fill in all fields',
      loginSuccess: 'Login successful!',
      loginFailed: 'Login failed. Please check your login information.',
      checkLoginInfo: 'Login failed. Please check your login information.',
      // Table & List
      filter: 'Filter',
      noData: 'No data available',
      loadingData: 'Loading data...',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      page: 'Page',
      // Status
      paused: 'Paused',
      banned: 'Banned',
      suspicious: 'Suspicious Activity',
      // Actions
      creating: 'Creating...',
      deleting: 'Deleting...',
      updating: 'Updating...',
      saving: 'Saving...',
      // Forms
      name: 'Name',
      email: 'Email',
      code: 'Code',
      description: 'Description',
      phone: 'Phone',
      username: 'Username',
      // Modals
      addNew: 'Add New',
      confirmDelete: 'Confirm Delete',
      deleteConfirmMessage: 'Are you sure you want to delete this item? This action cannot be undone.',
      // Placeholders
      enterName: 'Enter name...',
      enterEmail: 'Enter email...',
      enterGameName: 'Enter game name...',
      enterProviderAccountEmail: 'Enter provider account email...',
      // Details
      createdAt: 'Created Date',
      lastLogin: 'Last Login',
      neverLoggedIn: 'Never logged in',
      additionalInfo: 'Additional Information',
      edit: 'Edit',
      // Dashboard
      overview: 'Overview',
      increased: 'Increased',
      decreased: 'Decreased',
      weeklySales: 'Weekly Sales',
      weeklyOrders: 'Weekly Orders',
      visitorsOnline: 'Visitors Online',
      visitAndSalesStatistics: 'Visit And Sales Statistics',
      trafficSources: 'Traffic Sources',
      searchEngines: 'Search Engines',
      directClick: 'Direct Click',
      bookmarksClick: 'Bookmarks Click',
      recentTickets: 'Recent Tickets',
      assignee: 'Assignee',
      subject: 'Subject',
      lastUpdate: 'Last Update',
      trackingId: 'Tracking ID',
      done: 'DONE',
    },
    pages: {
      dashboard: {
        title: 'Dashboard',
        overview: 'Overview',
        weeklySales: 'Weekly Sales',
        weeklyOrders: 'Weekly Orders',
        visitorsOnline: 'Visitors Online',
        visitAndSalesStatistics: 'Visit And Sales Statistics',
        trafficSources: 'Traffic Sources',
        searchEngines: 'Search Engines',
        directClick: 'Direct Click',
        bookmarksClick: 'Bookmarks Click',
        recentTickets: 'Recent Tickets',
        assignee: 'Assignee',
        subject: 'Subject',
        lastUpdate: 'Last Update',
        trackingId: 'Tracking ID',
        done: 'DONE',
        increased: 'Increased',
        decreased: 'Decreased',
      },
      operators: {
        title: 'Operators Management',
        addOperator: 'Add Operator',
        createOperator: 'Create Operator',
        deleteOperator: 'Delete Operator',
        operatorDetails: 'Operator Details',
        searchPlaceholder: 'Search by name, email...',
        createSuccess: 'Operator created successfully!',
        createFailed: 'Failed to create operator. Please try again.',
        deleteSuccess: 'Operator deleted successfully!',
        deleteFailed: 'Failed to delete operator. Please try again.',
        viewDetails: 'View Details',
        deleteOperatorTitle: 'Delete Operator',
        description: 'Manage and track operators in the system',
        noOperatorsFound: 'No operators found',
        noOperatorsYet: 'No operators yet',
        operatorCode: 'Operator Code',
        operatorName: 'Operator Name',
        enterOperatorCode: 'Enter operator code...',
        enterOperatorName: 'Enter operator name...',
        randomData: 'Random data',
        random: 'Random',
        edit: 'Edit',
        userNotFound: 'User information not found',
        operatorsLabel: 'operators',
      },
      games: {
        title: 'Games Management',
        addGame: 'Add Game',
        createGame: 'Create Game',
        searchPlaceholder: 'Search game...',
        description: 'Manage and track games in the system',
      },
      providerAccounts: {
        title: 'Provider Accounts Management',
        addAccount: 'Add Provider Account',
        createAccount: 'Create Provider Account',
        deleteAccount: 'Delete Provider Account',
        searchPlaceholder: 'Search by name, email, code...',
        createSuccess: 'Provider Account created successfully!',
        createFailed: 'Failed to create provider account. Please try again.',
        deleteSuccess: 'Provider Account deleted successfully!',
        deleteFailed: 'Failed to delete provider account. Please try again.',
        deleteAccountTitle: 'Delete Provider Account',
        description: 'Manage and track provider accounts in the system',
        totalAccounts: 'Total Accounts',
        activeAccounts: 'Active',
        loadingAccounts: 'Loading provider accounts list...',
        providerAccount: 'Provider Account',
        noAccountsFound: 'No provider accounts found',
        noAccountsYet: 'No provider accounts yet',
        randomData: 'Random data',
        random: 'Random',
      },
      roles: {
        title: 'Roles Management',
        addRole: 'Add Role',
        createRole: 'Create Role',
        deleteRole: 'Delete Role',
        searchPlaceholder: 'Search role...',
        createSuccess: 'Role created successfully!',
        createFailed: 'Failed to create role. Please try again.',
        deleteSuccess: 'Role deleted successfully!',
        deleteFailed: 'Failed to delete role. Please try again.',
        role: 'Role',
        permissions: 'Permissions',
        noRolesFound: 'No roles found',
        noRolesYet: 'No roles yet',
        loadingRoles: 'Loading roles list...',
        loadingPermissions: 'Loading permissions list...',
        operatorAccounts: 'Operator Accounts',
        operatorAccount: 'Operator Account',
        selectPermissions: 'Select Permissions',
      },
      permissions: {
        title: 'Permissions Management',
        addPermission: 'Add Permission',
        createPermission: 'Create Permission',
        deletePermission: 'Delete Permission',
        searchPlaceholder: 'Search permission...',
        createSuccess: 'Permission created successfully!',
        createFailed: 'Failed to create permission. Please try again.',
        deleteSuccess: 'Permission deleted successfully!',
        deleteFailed: 'Failed to delete permission. Please try again.',
      },
      wallet: {
        title: 'Wallet & Payment',
        addMethod: 'Add Payment Method',
        totalMethods: 'Total Methods',
        activeMethods: 'Active Methods',
        totalDailyLimit: 'Total Daily Limit',
        dailyLimit: 'Daily Limit',
        monthlyLimit: 'Monthly Limit',
        bank: 'Bank',
        ewallet: 'E-Wallet',
        gateway: 'Payment Gateway',
        description: 'Manage payment methods and wallet settings',
      },
      promotions: {
        title: 'Promotions & Bonus',
        createPromotion: 'Create Promotion',
        totalPrograms: 'Total Programs',
        ongoing: 'Ongoing',
        totalParticipants: 'Total Participants',
        totalBonusAwarded: 'Total Bonus Awarded',
        programName: 'Program Name',
        bonus: 'Bonus',
        maxBonus: 'Max Bonus',
        participants: 'Participants',
        startDate: 'Start Date',
        endDate: 'End Date',
        firstDeposit: 'First Deposit',
        deposit: 'Deposit',
        cashback: 'Cashback',
        tournament: 'Tournament',
        rebate: 'Rebate',
        upcoming: 'Upcoming',
        expired: 'Expired',
        to: 'to',
        description: 'Manage promotions and bonus programs',
      },
      transactions: {
        title: 'Transactions',
        searchPlaceholder: 'Search transactions (ID, Player)...',
        exportReport: 'Export Report',
        totalTransactionsToday: 'Total Transactions Today',
        totalDeposit: 'Total Deposit',
        totalWithdraw: 'Total Withdraw',
        pendingProcessing: 'Pending Processing',
        transactionCode: 'Transaction Code',
        amount: 'Amount',
        paymentMethod: 'Payment Method',
        time: 'Time',
        deposit: 'Deposit',
        withdraw: 'Withdraw',
        bet: 'Bet',
        completed: 'Completed',
        rejected: 'Rejected',
        description: 'View and manage all transactions in the system',
      },
      settings: {
        title: 'System Settings',
        saveSettings: 'Save Settings',
        generalSettings: 'General Settings',
        notificationSettings: 'Notification Settings',
        securitySettings: 'Security Settings',
        paymentSettings: 'Payment Settings',
        systemName: 'System Name',
        systemDescription: 'Description',
        defaultLanguage: 'Default Language',
        emailNotification: 'Email Notification',
        emailNotificationDesc: 'Send email for important events',
        pushNotification: 'Push Notification',
        pushNotificationDesc: 'Push notifications to admin',
        smsAlert: 'SMS Alert',
        smsAlertDesc: 'Send SMS for important alerts',
        security: 'Security',
        sessionTimeout: 'Session Timeout (minutes)',
        maxLoginAttempts: 'Max Failed Login Attempts',
        require2FA: 'Require 2FA',
        require2FADesc: 'Two-factor authentication for admin',
        minDepositLimit: 'Min Deposit Limit (VND)',
        minWithdrawLimit: 'Min Withdraw Limit (VND)',
        withdrawProcessingTime: 'Withdraw Processing Time (hours)',
        description: 'Configure system settings and preferences',
      },
      alerts: {
        totalAlerts: 'Total Alerts',
        unread: 'Unread',
        warning: 'Warning',
        totalAlertsLabel: 'Total Alerts',
        description: 'View and manage system alerts and notifications',
      },
      reports: {
        exportPdf: 'Export PDF',
        exportExcel: 'Export Excel',
        monthlyRevenue: 'Monthly Revenue',
        profit: 'Profit',
        revenueByMonth: 'Revenue by Month',
        revenue: 'Revenue',
        winRate: 'Win Rate',
        comparedToLastMonth: '↑ % compared to last month',
        description: 'View and export system reports and statistics',
      },
      analytics: {
        registration: 'Registration',
        firstDeposit: 'First Deposit',
        playGame: 'Play Game',
        activeUsers: 'Active Users',
        revenuePerDay: 'Revenue/Day',
        sessions: 'Sessions',
        conversionRate: 'Conversion Rate',
        performanceLast5Days: 'Performance Last 5 Days',
        conversionRateChart: 'Conversion Rate',
        revenueTrend: 'Revenue Trend',
        comparedToYesterday: '↑ % compared to yesterday',
        description: 'View performance analytics and metrics',
      },
      monitoring: {
        online: 'Online',
        offline: 'Offline',
        warning: 'Warning',
        systemStatus: 'System Status',
        service: 'Service',
        uptime: 'Uptime',
        latency: 'Latency',
        avgUptime: 'Avg Uptime',
        totalServices: 'Total Services',
        recentEvents: 'Recent Events',
        description: 'Monitor system services and performance',
      },
      risk: {
        totalAlerts: 'Total Risk Alerts',
        fraud: 'Fraud',
        unusualPattern: 'Unusual Pattern',
        accountCompromise: 'Account Compromise',
        pending: 'Pending',
        investigating: 'Investigating',
        resolved: 'Resolved',
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        lockedAccounts: 'Locked Accounts',
        type: 'Type',
        severity: 'Severity',
        time: 'Time',
        title: 'Risk Management',
        description: 'Detect and handle security risks',
      },
      api: {
        title: 'API Management',
        createApiKey: 'Create New API Key',
        description: 'Manage API keys and endpoints',
        totalApiKeys: 'Total API Keys',
        activeKeys: 'Active Keys',
        totalRequestsToday: 'Total Requests Today',
        avgResponseTime: 'Avg Response Time',
        apiKeys: 'API Keys',
        apiKey: 'API Key',
        lastUsed: 'Last Used',
        requests: 'Requests',
        rateLimit: 'Rate Limit',
        apiEndpoints: 'API Endpoints',
        method: 'Method',
        path: 'Path',
        callsToday: 'Calls (Today)',
        avgResponse: 'Avg Response',
      },
      auditLogs: {
        title: 'Audit Logs',
        searchPlaceholder: 'Search logs (user, action, resource)...',
        description: 'System activity and access logs',
        exportLogs: 'Export Logs',
        time: 'Time',
        user: 'User',
        action: 'Action',
        resource: 'Resource',
        ipAddress: 'IP Address',
        login: 'Login',
        logout: 'Logout',
        updatePlayer: 'Update Player',
        createPromotion: 'Create Promotion',
        deleteGame: 'Delete Game',
        changeSettings: 'Change Settings',
        viewSensitiveData: 'View Sensitive Data',
      },
      players: {
        totalPlayers: 'Total Players',
        activePlayers: 'Active Players',
        inactivePlayers: 'Inactive Players',
        totalBalance: 'Total Balance',
        username: 'Username',
        balance: 'Balance',
        registrationDate: 'Registration Date',
        description: 'Manage and track players in the system',
      },
      profile: {
        description: 'View and manage your personal profile information',
        personalInfo: 'Personal Information',
        accountSecurity: 'Account Security',
        changePassword: 'Change Password',
        changePasswordDesc: 'Update your account password for better security',
        twoFactorAuth: 'Two-Factor Authentication',
        twoFactorAuthDesc: 'Add an extra layer of security to your account',
        changePhoto: 'Change Photo',
      },
      userSettings: {
        description: 'Manage your personal settings and preferences',
        notifications: 'Notifications',
        appearance: 'Appearance',
        privacy: 'Privacy',
        emailNotifications: 'Email Notifications',
        emailNotificationsDesc: 'Receive notifications via email',
        pushNotifications: 'Push Notifications',
        pushNotificationsDesc: 'Receive push notifications in browser',
        smsNotifications: 'SMS Notifications',
        smsNotificationsDesc: 'Receive notifications via SMS',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto',
        showEmail: 'Show Email',
        showEmailDesc: 'Display your email address to other users',
        showPhone: 'Show Phone',
        showPhoneDesc: 'Display your phone number to other users',
      },
      tables: {
        id: 'ID',
        player: 'Player',
        type: 'Type',
        severity: 'Severity',
        description: 'Description',
        status: 'Status',
        time: 'Time',
        actions: 'Actions',
        service: 'Service',
        uptime: 'Uptime',
        latency: 'Latency',
        players: 'Players',
        gameName: 'Game Name',
        revenue: 'Revenue',
        totalWagered: 'Total Wagered',
        game: 'Game',
        wagered: 'Wagered',
      },
    },
    header: {
      providerPortal: 'Provider Portal',
      operatorPortal: 'Operator Portal',
      myProfile: 'My Profile',
      helpSupport: 'Help & Support',
    },
    menu: {
      dashboard: 'Dashboard',
      gamesManagement: 'Games Management',
      operatorsManagement: 'Operators Management',
      providerAccountsManagement: 'Provider Accounts Management',
      rolesPermissionsManagement: 'Roles & Permissions Management',
      playersManagement: 'Players Management',
      transactions: 'Transactions',
      walletPayment: 'Wallet & Payment',
      promotionsBonus: 'Promotions & Bonus',
      reports: 'Reports & Statistics',
      analytics: 'Performance Analytics',
      monitoring: 'Monitoring',
      riskManagement: 'Risk Management',
      apiManagement: 'API Management',
      alerts: 'Alerts & Warnings',
      auditLogs: 'Audit Logs',
      systemSettings: 'System Settings',
    },
    languages: {
      en: 'English',
      vi: 'Vietnamese',
      zh: 'Chinese',
      th: 'Thai',
      ja: 'Japanese',
      ko: 'Korean',
    },
  },
  vi: {
    common: {
      search: 'Tìm kiếm',
      profile: 'Hồ sơ',
      settings: 'Cài đặt',
      help: 'Trợ giúp',
      logout: 'Đăng xuất',
      fullscreen: 'Toàn màn hình',
      messages: 'Tin nhắn',
      notifications: 'Thông báo',
      viewAll: 'Xem tất cả',
      language: 'Ngôn ngữ',
      user: 'Người dùng',
      searchPlaceholder: 'Tìm kiếm...',
      searchBy: 'Tìm kiếm theo',
      // Actions
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      editAction: 'Sửa',
      add: 'Thêm',
      create: 'Tạo',
      update: 'Cập nhật',
      submit: 'Gửi',
      confirm: 'Xác nhận',
      close: 'Đóng',
      back: 'Quay lại',
      next: 'Tiếp',
      previous: 'Trước',
      view: 'Xem',
      detailsAction: 'Chi tiết',
      actions: 'Hành động',
      // Status
      status: 'Trạng thái',
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      success: 'Thành công',
      error: 'Lỗi',
      loading: 'Đang tải',
      yes: 'Có',
      no: 'Không',
      ok: 'OK',
      // Login
      providerOperatorPortal: 'Cổng Nhà Cung Cấp & Nhà Vận Hành',
      login: 'Đăng Nhập',
      welcome: 'Chào mừng trở lại!',
      emailOrUsername: 'Email hoặc Username',
      password: 'Mật khẩu',
      forgotPassword: 'Quên mật khẩu?',
      loggingIn: 'Đang đăng nhập...',
      // Messages
      pleaseFillAllFields: 'Vui lòng điền đầy đủ thông tin',
      loginSuccess: 'Đăng nhập thành công!',
      loginFailed: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.',
      checkLoginInfo: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.',
      // Table & List
      filter: 'Lọc',
      noData: 'Không có dữ liệu',
      loadingData: 'Đang tải dữ liệu...',
      showing: 'Hiển thị',
      to: 'đến',
      of: 'trong',
      page: 'Trang',
      // Status
      paused: 'Tạm dừng',
      banned: 'Đã cấm',
      suspicious: 'Hoạt động đáng ngờ',
      // Actions
      creating: 'Đang tạo...',
      deleting: 'Đang xóa...',
      updating: 'Đang cập nhật...',
      saving: 'Đang lưu...',
      // Forms
      name: 'Tên',
      email: 'Email',
      code: 'Mã',
      description: 'Mô tả',
      phone: 'Số điện thoại',
      username: 'Tên đăng nhập',
      // Modals
      addNew: 'Thêm mới',
      confirmDelete: 'Xác nhận xóa',
      deleteConfirmMessage: 'Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.',
      // Placeholders
      enterName: 'Nhập tên...',
      enterEmail: 'Nhập email...',
      enterGameName: 'Nhập tên game...',
      enterProviderAccountEmail: 'Nhập email provider account...',
      // Details
      createdAt: 'Ngày tạo',
      lastLogin: 'Đăng nhập cuối',
      neverLoggedIn: 'Chưa đăng nhập',
      additionalInfo: 'Thông tin bổ sung',
      edit: 'Chỉnh sửa',
      // Dashboard
      overview: 'Tổng quan',
      increased: 'Tăng',
      decreased: 'Giảm',
      weeklySales: 'Doanh thu tuần',
      weeklyOrders: 'Đơn hàng tuần',
      visitorsOnline: 'Khách truy cập trực tuyến',
      visitAndSalesStatistics: 'Thống kê Truy cập và Bán hàng',
      trafficSources: 'Nguồn lưu lượng',
      searchEngines: 'Công cụ tìm kiếm',
      directClick: 'Nhấp trực tiếp',
      bookmarksClick: 'Nhấp dấu trang',
      recentTickets: 'Vé gần đây',
      assignee: 'Người được giao',
      subject: 'Chủ đề',
      lastUpdate: 'Cập nhật lần cuối',
      trackingId: 'ID Theo dõi',
      done: 'HOÀN THÀNH',
    },
    pages: {
      dashboard: {
        title: 'Dashboard',
        overview: 'Tổng quan',
        weeklySales: 'Doanh thu tuần',
        weeklyOrders: 'Đơn hàng tuần',
        visitorsOnline: 'Khách truy cập trực tuyến',
        visitAndSalesStatistics: 'Thống kê Truy cập và Bán hàng',
        trafficSources: 'Nguồn lưu lượng',
        searchEngines: 'Công cụ tìm kiếm',
        directClick: 'Nhấp trực tiếp',
        bookmarksClick: 'Nhấp dấu trang',
        recentTickets: 'Vé gần đây',
        assignee: 'Người được giao',
        subject: 'Chủ đề',
        lastUpdate: 'Cập nhật lần cuối',
        trackingId: 'ID Theo dõi',
        done: 'HOÀN THÀNH',
        increased: 'Tăng',
        decreased: 'Giảm',
      },
      operators: {
        title: 'Quản lý Operator',
        addOperator: 'Thêm Operator',
        createOperator: 'Tạo Operator',
        deleteOperator: 'Xóa Operator',
        operatorDetails: 'Chi tiết Operator',
        searchPlaceholder: 'Tìm kiếm theo tên, email...',
        createSuccess: 'Tạo Operator thành công!',
        createFailed: 'Tạo Operator thất bại. Vui lòng thử lại.',
        deleteSuccess: 'Xóa Operator thành công!',
        deleteFailed: 'Xóa Operator thất bại. Vui lòng thử lại.',
        viewDetails: 'Xem chi tiết',
        deleteOperatorTitle: 'Xóa Operator',
        description: 'Quản lý và theo dõi các Operator trong hệ thống',
        noOperatorsFound: 'Không tìm thấy Operator nào',
        noOperatorsYet: 'Chưa có Operator nào',
        operatorCode: 'Mã Operator',
        operatorName: 'Tên Operator',
        enterOperatorCode: 'Nhập mã operator...',
        enterOperatorName: 'Nhập tên operator...',
        randomData: 'Random dữ liệu',
        random: 'Random',
        edit: 'Chỉnh sửa',
        userNotFound: 'Không tìm thấy thông tin người dùng',
        operatorsLabel: 'operator',
      },
      games: {
        title: 'Quản lý Games',
        addGame: 'Thêm Game',
        createGame: 'Tạo Game',
        searchPlaceholder: 'Tìm kiếm game...',
        description: 'Quản lý và theo dõi các game trong hệ thống',
      },
      providerAccounts: {
        title: 'Quản lý Provider Account',
        addAccount: 'Thêm Provider Account',
        createAccount: 'Tạo Provider Account',
        deleteAccount: 'Xóa Provider Account',
        searchPlaceholder: 'Tìm kiếm theo tên, email, mã...',
        createSuccess: 'Tạo Provider Account thành công!',
        createFailed: 'Tạo Provider Account thất bại. Vui lòng thử lại.',
        deleteSuccess: 'Xóa Provider Account thành công!',
        deleteFailed: 'Xóa Provider Account thất bại. Vui lòng thử lại.',
        deleteAccountTitle: 'Xóa Provider Account',
        description: 'Quản lý và theo dõi các Provider Account trong hệ thống',
        totalAccounts: 'Tổng số Account',
        activeAccounts: 'Đang hoạt động',
        loadingAccounts: 'Đang tải danh sách Provider Account...',
        providerAccount: 'Provider Account',
        noAccountsFound: 'Không tìm thấy Provider Account nào',
        noAccountsYet: 'Chưa có Provider Account nào',
        randomData: 'Random dữ liệu',
        random: 'Random',
      },
      roles: {
        title: 'Quản lý Role',
        addRole: 'Thêm Role',
        createRole: 'Tạo Role',
        deleteRole: 'Xóa Role',
        searchPlaceholder: 'Tìm kiếm role...',
        createSuccess: 'Tạo Role thành công!',
        createFailed: 'Tạo Role thất bại. Vui lòng thử lại.',
        deleteSuccess: 'Xóa Role thành công!',
        deleteFailed: 'Xóa Role thất bại. Vui lòng thử lại.',
        role: 'Role',
        permissions: 'Permissions',
        noRolesFound: 'Không tìm thấy Role nào',
        noRolesYet: 'Chưa có Role nào',
        loadingRoles: 'Đang tải danh sách Roles...',
        loadingPermissions: 'Đang tải danh sách Permissions...',
        operatorAccounts: 'Operator Accounts',
        operatorAccount: 'Operator Account',
        selectPermissions: 'Chọn Permissions',
      },
      permissions: {
        title: 'Quản lý Permission',
        addPermission: 'Thêm Permission',
        createPermission: 'Tạo Permission',
        deletePermission: 'Xóa Permission',
        searchPlaceholder: 'Tìm kiếm permission...',
        createSuccess: 'Tạo Permission thành công!',
        createFailed: 'Tạo Permission thất bại. Vui lòng thử lại.',
        deleteSuccess: 'Xóa Permission thành công!',
        deleteFailed: 'Xóa Permission thất bại. Vui lòng thử lại.',
      },
      wallet: {
        title: 'Ví & Thanh toán',
        addMethod: 'Thêm phương thức',
        totalMethods: 'Tổng phương thức',
        activeMethods: 'Đang hoạt động',
        totalDailyLimit: 'Tổng hạn mức/ngày',
        dailyLimit: 'Hạn mức/ngày',
        monthlyLimit: 'Hạn mức/tháng',
        bank: 'Ngân hàng',
        ewallet: 'Ví điện tử',
        gateway: 'Cổng thanh toán',
        description: 'Quản lý các phương thức thanh toán và cài đặt ví',
      },
      promotions: {
        title: 'Khuyến mãi & Bonus',
        createPromotion: 'Tạo khuyến mãi',
        totalPrograms: 'Tổng chương trình',
        ongoing: 'Đang diễn ra',
        totalParticipants: 'Tổng tham gia',
        totalBonusAwarded: 'Tổng bonus đã trao',
        programName: 'Tên chương trình',
        bonus: 'Bonus',
        maxBonus: 'Bonus tối đa',
        participants: 'Tham gia',
        startDate: 'Ngày bắt đầu',
        endDate: 'Ngày kết thúc',
        firstDeposit: 'Nạp đầu',
        deposit: 'Nạp tiền',
        cashback: 'Cashback',
        tournament: 'Giải đấu',
        rebate: 'Hoàn tiền',
        upcoming: 'Sắp tới',
        expired: 'Đã kết thúc',
        to: 'đến',
        description: 'Quản lý các chương trình khuyến mãi và bonus',
      },
      transactions: {
        title: 'Giao dịch',
        searchPlaceholder: 'Tìm kiếm giao dịch (ID, Player)...',
        exportReport: 'Xuất báo cáo',
        totalTransactionsToday: 'Tổng giao dịch hôm nay',
        totalDeposit: 'Tổng nạp',
        totalWithdraw: 'Tổng rút',
        pendingProcessing: 'Đang chờ xử lý',
        transactionCode: 'Mã GD',
        amount: 'Số tiền',
        paymentMethod: 'Phương thức',
        time: 'Thời gian',
        deposit: 'Nạp',
        withdraw: 'Rút',
        bet: 'Cược',
        completed: 'Hoàn thành',
        rejected: 'Từ chối',
        description: 'Xem và quản lý tất cả các giao dịch trong hệ thống',
      },
      settings: {
        title: 'Cài đặt hệ thống',
        saveSettings: 'Lưu cài đặt',
        generalSettings: 'Cài đặt chung',
        notificationSettings: 'Cài đặt thông báo',
        securitySettings: 'Bảo mật',
        paymentSettings: 'Cài đặt thanh toán',
        systemName: 'Tên hệ thống',
        systemDescription: 'Mô tả',
        defaultLanguage: 'Ngôn ngữ mặc định',
        emailNotification: 'Email thông báo',
        emailNotificationDesc: 'Gửi email khi có sự kiện quan trọng',
        pushNotification: 'Push notification',
        pushNotificationDesc: 'Thông báo đẩy đến admin',
        smsAlert: 'SMS cảnh báo',
        smsAlertDesc: 'Gửi SMS cho các cảnh báo quan trọng',
        security: 'Bảo mật',
        sessionTimeout: 'Thời gian hết hạn session (phút)',
        maxLoginAttempts: 'Số lần đăng nhập sai tối đa',
        require2FA: 'Yêu cầu 2FA',
        require2FADesc: 'Xác thực hai yếu tố cho admin',
        minDepositLimit: 'Hạn mức nạp tối thiểu (VNĐ)',
        minWithdrawLimit: 'Hạn mức rút tối thiểu (VNĐ)',
        withdrawProcessingTime: 'Thời gian xử lý rút tiền (giờ)',
        description: 'Cấu hình các cài đặt và tùy chọn hệ thống',
      },
      alerts: {
        totalAlerts: 'Tổng cảnh báo',
        unread: 'Chưa đọc',
        warning: 'Cảnh báo',
        totalAlertsLabel: 'Tổng cảnh báo',
        description: 'Xem và quản lý các cảnh báo và thông báo hệ thống',
      },
      reports: {
        exportPdf: 'Xuất PDF',
        exportExcel: 'Xuất Excel',
        monthlyRevenue: 'Doanh thu tháng này',
        profit: 'Lợi nhuận',
        revenueByMonth: 'Doanh thu theo tháng',
        revenue: 'Doanh thu',
        winRate: 'Tỷ lệ thắng',
        comparedToLastMonth: '↑ % so với tháng trước',
        description: 'Xem và xuất các báo cáo và thống kê hệ thống',
      },
      analytics: {
        registration: 'Đăng ký',
        firstDeposit: 'Nạp đầu',
        playGame: 'Chơi game',
        activeUsers: 'Người dùng hoạt động',
        revenuePerDay: 'Doanh thu/Ngày',
        sessions: 'Phiên',
        conversionRate: 'Tỷ lệ chuyển đổi',
        performanceLast5Days: 'Hiệu suất 5 ngày qua',
        conversionRateChart: 'Tỷ lệ chuyển đổi',
        revenueTrend: 'Xu hướng doanh thu',
        comparedToYesterday: '↑ % so với ngày trước',
        description: 'Xem phân tích hiệu suất và các chỉ số',
      },
      monitoring: {
        online: 'Online',
        offline: 'Offline',
        warning: 'Warning',
        systemStatus: 'Trạng thái hệ thống',
        service: 'Service',
        uptime: 'Uptime',
        latency: 'Latency',
        avgUptime: 'Avg Uptime',
        totalServices: 'Tổng Services',
        recentEvents: 'Sự kiện gần đây',
        description: 'Giám sát các dịch vụ và hiệu suất hệ thống',
      },
      risk: {
        totalAlerts: 'Tổng cảnh báo rủi ro',
        fraud: 'Gian lận',
        unusualPattern: 'Mẫu bất thường',
        accountCompromise: 'Tài khoản bị xâm nhập',
        pending: 'Chờ xử lý',
        investigating: 'Đang điều tra',
        resolved: 'Đã giải quyết',
        critical: 'Nghiêm trọng',
        high: 'Cao',
        medium: 'Trung bình',
        low: 'Thấp',
        lockedAccounts: 'Tài khoản bị khóa',
        type: 'Loại',
        severity: 'Mức độ',
        time: 'Thời gian',
        title: 'Quản lý rủi ro',
        description: 'Phát hiện và xử lý các rủi ro bảo mật',
      },
      api: {
        title: 'API Management',
        createApiKey: 'Tạo API Key mới',
        description: 'Quản lý API keys và endpoints',
        totalApiKeys: 'Tổng API Keys',
        activeKeys: 'Active Keys',
        totalRequestsToday: 'Tổng requests hôm nay',
        avgResponseTime: 'Avg Response Time',
        apiKeys: 'API Keys',
        apiKey: 'API Key',
        lastUsed: 'Lần dùng cuối',
        requests: 'Requests',
        rateLimit: 'Rate Limit',
        apiEndpoints: 'API Endpoints',
        method: 'Method',
        path: 'Path',
        callsToday: 'Calls (hôm nay)',
        avgResponse: 'Avg Response',
      },
      auditLogs: {
        title: 'Audit Logs',
        searchPlaceholder: 'Tìm kiếm logs (user, action, resource)...',
        description: 'Nhật ký hoạt động và truy cập hệ thống',
        exportLogs: 'Xuất logs',
        time: 'Thời gian',
        user: 'User',
        action: 'Hành động',
        resource: 'Tài nguyên',
        ipAddress: 'IP Address',
        login: 'Đăng nhập',
        logout: 'Đăng xuất',
        updatePlayer: 'Cập nhật player',
        createPromotion: 'Tạo khuyến mãi',
        deleteGame: 'Xóa game',
        changeSettings: 'Thay đổi cài đặt',
        viewSensitiveData: 'Xem dữ liệu nhạy cảm',
      },
      players: {
        totalPlayers: 'Tổng Players',
        activePlayers: 'Active Players',
        inactivePlayers: 'Inactive Players',
        totalBalance: 'Tổng Balance',
        username: 'Username',
        balance: 'Balance',
        registrationDate: 'Ngày đăng ký',
        description: 'Quản lý và theo dõi các players trong hệ thống',
      },
      profile: {
        description: 'Xem và quản lý thông tin hồ sơ cá nhân của bạn',
        personalInfo: 'Thông tin cá nhân',
        accountSecurity: 'Bảo mật tài khoản',
        changePassword: 'Đổi mật khẩu',
        changePasswordDesc: 'Cập nhật mật khẩu tài khoản để bảo mật tốt hơn',
        twoFactorAuth: 'Xác thực hai yếu tố',
        twoFactorAuthDesc: 'Thêm một lớp bảo mật bổ sung cho tài khoản của bạn',
        changePhoto: 'Đổi ảnh',
      },
      userSettings: {
        description: 'Quản lý cài đặt và tùy chọn cá nhân của bạn',
        notifications: 'Thông báo',
        appearance: 'Giao diện',
        privacy: 'Quyền riêng tư',
        emailNotifications: 'Thông báo Email',
        emailNotificationsDesc: 'Nhận thông báo qua email',
        pushNotifications: 'Thông báo Push',
        pushNotificationsDesc: 'Nhận thông báo push trong trình duyệt',
        smsNotifications: 'Thông báo SMS',
        smsNotificationsDesc: 'Nhận thông báo qua SMS',
        language: 'Ngôn ngữ',
        theme: 'Giao diện',
        light: 'Sáng',
        dark: 'Tối',
        auto: 'Tự động',
        showEmail: 'Hiển thị Email',
        showEmailDesc: 'Hiển thị địa chỉ email của bạn cho người dùng khác',
        showPhone: 'Hiển thị Số điện thoại',
        showPhoneDesc: 'Hiển thị số điện thoại của bạn cho người dùng khác',
      },
      tables: {
        id: 'ID',
        player: 'Player',
        type: 'Loại',
        severity: 'Mức độ',
        description: 'Mô tả',
        status: 'Trạng thái',
        time: 'Thời gian',
        actions: 'Hành động',
        service: 'Service',
        uptime: 'Uptime',
        latency: 'Latency',
        players: 'Players',
        gameName: 'Tên Game',
        revenue: 'Doanh thu',
        totalWagered: 'Tổng cược',
        game: 'Game',
        wagered: 'Tổng cược',
      },
    },
    header: {
      providerPortal: 'Provider Portal',
      operatorPortal: 'Operator Portal',
      myProfile: 'Hồ sơ của tôi',
      helpSupport: 'Trợ giúp & Hỗ trợ',
    },
    menu: {
      dashboard: 'Dashboard',
      gamesManagement: 'Quản lý Games',
      operatorsManagement: 'Quản lý Operator',
      providerAccountsManagement: 'Quản lý Provider Account',
      rolesPermissionsManagement: 'Quản lý Role & Permission',
      playersManagement: 'Quản lý Players',
      transactions: 'Giao dịch',
      walletPayment: 'Ví & Thanh toán',
      promotionsBonus: 'Khuyến mãi & Bonus',
      reports: 'Báo cáo & Thống kê',
      analytics: 'Phân tích hiệu suất',
      monitoring: 'Monitoring',
      riskManagement: 'Quản lý rủi ro',
      apiManagement: 'API Management',
      alerts: 'Cảnh báo & Alerts',
      auditLogs: 'Audit Logs',
      systemSettings: 'Cài đặt hệ thống',
    },
    languages: {
      en: 'Tiếng Anh',
      vi: 'Tiếng Việt',
      zh: 'Tiếng Trung',
      th: 'Tiếng Thái',
      ja: 'Tiếng Nhật',
      ko: 'Tiếng Hàn',
    },
  },
  zh: {
    common: {
      search: '搜索',
      profile: '个人资料',
      settings: '设置',
      help: '帮助',
      logout: '登出',
      fullscreen: '全屏',
      messages: '消息',
      notifications: '通知',
      viewAll: '查看全部',
      language: '语言',
      user: '用户',
      searchPlaceholder: '搜索...',
      searchBy: '搜索',
      // Actions
      save: '保存',
      cancel: '取消',
      delete: '删除',
      editAction: '编辑',
      add: '添加',
      create: '创建',
      update: '更新',
      submit: '提交',
      confirm: '确认',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      view: '查看',
      detailsAction: '详情',
      actions: '操作',
      // Status
      status: '状态',
      active: '活跃',
      inactive: '非活跃',
      success: '成功',
      error: '错误',
      loading: '加载中',
      yes: '是',
      no: '否',
      ok: '确定',
      // Login
      providerOperatorPortal: '提供商和运营商门户',
      login: '登录',
      welcome: '欢迎回来！',
      emailOrUsername: '邮箱或用户名',
      password: '密码',
      forgotPassword: '忘记密码？',
      loggingIn: '登录中...',
      // Messages
      pleaseFillAllFields: '请填写所有字段',
      loginSuccess: '登录成功！',
      loginFailed: '登录失败。请检查您的登录信息。',
      checkLoginInfo: '登录失败。请检查您的登录信息。',
      // Table & List
      filter: '筛选',
      noData: '暂无数据',
      loadingData: '加载数据中...',
      showing: '显示',
      to: '到',
      of: '共',
      page: '页',
      // Status
      paused: '已暂停',
      banned: '已封禁',
      suspicious: '可疑活动',
      // Actions
      creating: '创建中...',
      deleting: '删除中...',
      updating: '更新中...',
      saving: '保存中...',
      // Forms
      name: '名称',
      email: '邮箱',
      code: '代码',
      description: '描述',
      phone: '电话',
      username: '用户名',
      // Modals
      addNew: '添加新',
      confirmDelete: '确认删除',
      deleteConfirmMessage: '您确定要删除此项吗？此操作无法撤销。',
      // Placeholders
      enterName: '输入名称...',
      enterEmail: '输入邮箱...',
      enterGameName: '输入游戏名称...',
      enterProviderAccountEmail: '输入提供商账户邮箱...',
      // Details
      createdAt: '创建日期',
      lastLogin: '最后登录',
      neverLoggedIn: '从未登录',
      additionalInfo: '附加信息',
      edit: '编辑',
      // Dashboard
      overview: '概览',
      increased: '增加',
      decreased: '减少',
      weeklySales: '周销售额',
      weeklyOrders: '周订单',
      visitorsOnline: '在线访客',
      visitAndSalesStatistics: '访问和销售统计',
      trafficSources: '流量来源',
      searchEngines: '搜索引擎',
      directClick: '直接点击',
      bookmarksClick: '书签点击',
      recentTickets: '最近工单',
      assignee: '受理人',
      subject: '主题',
      lastUpdate: '最后更新',
      trackingId: '跟踪ID',
      done: '已完成',
    },
    pages: {
      dashboard: {
        title: '仪表板',
        overview: '概览',
        weeklySales: '周销售额',
        weeklyOrders: '周订单',
        visitorsOnline: '在线访客',
        visitAndSalesStatistics: '访问和销售统计',
        trafficSources: '流量来源',
        searchEngines: '搜索引擎',
        directClick: '直接点击',
        bookmarksClick: '书签点击',
        recentTickets: '最近工单',
        assignee: '受理人',
        subject: '主题',
        lastUpdate: '最后更新',
        trackingId: '跟踪ID',
        done: '已完成',
        increased: '增加',
        decreased: '减少',
      },
      operators: {
        title: '运营商管理',
        addOperator: '添加运营商',
        createOperator: '创建运营商',
        deleteOperator: '删除运营商',
        operatorDetails: '运营商详情',
        searchPlaceholder: '按名称、邮箱搜索...',
        createSuccess: '运营商创建成功！',
        createFailed: '创建运营商失败。请重试。',
        deleteSuccess: '运营商删除成功！',
        deleteFailed: '删除运营商失败。请重试。',
        viewDetails: '查看详情',
        deleteOperatorTitle: '删除运营商',
        description: '管理系统中的运营商',
        noOperatorsFound: '未找到运营商',
        noOperatorsYet: '暂无运营商',
        operatorCode: '运营商代码',
        operatorName: '运营商名称',
        enterOperatorCode: '输入运营商代码...',
        enterOperatorName: '输入运营商名称...',
        randomData: '随机数据',
        random: '随机',
        edit: '编辑',
        userNotFound: '未找到用户信息',
        operatorsLabel: '运营商',
      },
      games: {
        title: '游戏管理',
        addGame: '添加游戏',
        createGame: '创建游戏',
        searchPlaceholder: '搜索游戏...',
        description: '管理系统中的游戏',
      },
      providerAccounts: {
        title: '提供商账户管理',
        addAccount: '添加提供商账户',
        createAccount: '创建提供商账户',
        deleteAccount: '删除提供商账户',
        searchPlaceholder: '按名称、邮箱、代码搜索...',
        createSuccess: '提供商账户创建成功！',
        createFailed: '创建提供商账户失败。请重试。',
        deleteSuccess: '提供商账户删除成功！',
        deleteFailed: '删除提供商账户失败。请重试。',
        deleteAccountTitle: '删除提供商账户',
        description: '管理系统中的提供商账户',
        totalAccounts: '总账户数',
        activeAccounts: '活跃',
        loadingAccounts: '正在加载提供商账户列表...',
        providerAccount: '提供商账户',
        noAccountsFound: '未找到提供商账户',
        noAccountsYet: '暂无提供商账户',
        randomData: '随机数据',
        random: '随机',
      },
      roles: {
        title: '角色管理',
        addRole: '添加角色',
        createRole: '创建角色',
        deleteRole: '删除角色',
        searchPlaceholder: '搜索角色...',
        createSuccess: '角色创建成功！',
        createFailed: '创建角色失败。请重试。',
        deleteSuccess: '角色删除成功！',
        deleteFailed: '删除角色失败。请重试。',
        role: '角色',
        permissions: '权限',
        noRolesFound: '未找到角色',
        noRolesYet: '暂无角色',
        loadingRoles: '正在加载角色列表...',
        loadingPermissions: '正在加载权限列表...',
        operatorAccounts: '运营商账户',
        operatorAccount: '运营商账户',
        selectPermissions: '选择权限',
      },
      permissions: {
        title: '权限管理',
        addPermission: '添加权限',
        createPermission: '创建权限',
        deletePermission: '删除权限',
        searchPlaceholder: '搜索权限...',
        createSuccess: '权限创建成功！',
        createFailed: '创建权限失败。请重试。',
        deleteSuccess: '权限删除成功！',
        deleteFailed: '删除权限失败。请重试。',
      },
      wallet: {
        title: '钱包和支付',
        addMethod: '添加支付方式',
        totalMethods: '总支付方式',
        activeMethods: '活跃方式',
        totalDailyLimit: '总每日限额',
        dailyLimit: '每日限额',
        monthlyLimit: '每月限额',
        bank: '银行',
        ewallet: '电子钱包',
        gateway: '支付网关',
        description: '管理支付方式和钱包设置',
      },
      promotions: {
        title: '促销和奖金',
        createPromotion: '创建促销',
        totalPrograms: '总计划数',
        ongoing: '进行中',
        totalParticipants: '总参与数',
        totalBonusAwarded: '已发放总奖金',
        programName: '计划名称',
        bonus: '奖金',
        maxBonus: '最大奖金',
        participants: '参与数',
        startDate: '开始日期',
        endDate: '结束日期',
        firstDeposit: '首存',
        deposit: '存款',
        cashback: '返现',
        tournament: '锦标赛',
        rebate: '返水',
        upcoming: '即将开始',
        expired: '已过期',
        to: '至',
        description: '管理促销和奖金计划',
      },
      transactions: {
        title: '交易',
        searchPlaceholder: '搜索交易（ID、玩家）...',
        exportReport: '导出报告',
        totalTransactionsToday: '今日总交易',
        totalDeposit: '总存款',
        totalWithdraw: '总提款',
        pendingProcessing: '待处理',
        transactionCode: '交易代码',
        amount: '金额',
        paymentMethod: '支付方式',
        time: '时间',
        deposit: '存款',
        withdraw: '提款',
        bet: '投注',
        completed: '已完成',
        rejected: '已拒绝',
        description: '查看和管理系统中的所有交易',
      },
      auditLogs: {
        title: '审计日志',
        searchPlaceholder: '搜索日志（用户、操作、资源）...',
        description: '系统活动和访问日志',
        exportLogs: '导出日志',
        time: '时间',
        user: '用户',
        action: '操作',
        resource: '资源',
        ipAddress: 'IP地址',
        login: '登录',
        logout: '登出',
        updatePlayer: '更新玩家',
        createPromotion: '创建促销',
        deleteGame: '删除游戏',
        changeSettings: '更改设置',
        viewSensitiveData: '查看敏感数据',
      },
      settings: {
        title: '系统设置',
        saveSettings: '保存设置',
        generalSettings: '常规设置',
        notificationSettings: '通知设置',
        securitySettings: '安全设置',
        paymentSettings: '支付设置',
        systemName: '系统名称',
        systemDescription: '描述',
        defaultLanguage: '默认语言',
        emailNotification: '邮件通知',
        emailNotificationDesc: '重要事件时发送邮件',
        pushNotification: '推送通知',
        pushNotificationDesc: '向管理员推送通知',
        smsAlert: '短信警报',
        smsAlertDesc: '重要警报时发送短信',
        security: '安全',
        sessionTimeout: '会话超时（分钟）',
        maxLoginAttempts: '最大登录失败次数',
        require2FA: '要求2FA',
        require2FADesc: '管理员需要双因素认证',
        minDepositLimit: '最小存款限额（越南盾）',
        minWithdrawLimit: '最小提款限额（越南盾）',
        withdrawProcessingTime: '提款处理时间（小时）',
        description: '配置系统设置和首选项',
      },
      alerts: {
        totalAlerts: '总警报数',
        unread: '未读',
        warning: '警告',
        totalAlertsLabel: '总警报',
        description: '查看和管理系统警报和通知',
      },
      reports: {
        exportPdf: '导出PDF',
        exportExcel: '导出Excel',
        monthlyRevenue: '本月收入',
        profit: '利润',
        revenueByMonth: '按月收入',
        revenue: '收入',
        winRate: '胜率',
        comparedToLastMonth: '↑ % 与上月相比',
        description: '查看和导出系统报告和统计',
      },
      analytics: {
        registration: '注册',
        firstDeposit: '首存',
        playGame: '游戏',
        activeUsers: '活跃用户',
        revenuePerDay: '每日收入',
        sessions: '会话',
        conversionRate: '转化率',
        performanceLast5Days: '过去5天表现',
        conversionRateChart: '转化率',
        revenueTrend: '收入趋势',
        comparedToYesterday: '↑ % 与昨天相比',
        description: '查看性能分析和指标',
      },
      monitoring: {
        online: '在线',
        offline: '离线',
        warning: '警告',
        systemStatus: '系统状态',
        service: '服务',
        uptime: '运行时间',
        latency: '延迟',
        avgUptime: '平均运行时间',
        totalServices: '总服务数',
        recentEvents: '最近事件',
        description: '监控系统服务和性能',
      },
      risk: {
        totalAlerts: '总风险警报',
        fraud: '欺诈',
        unusualPattern: '异常模式',
        accountCompromise: '账户被入侵',
        pending: '待处理',
        investigating: '调查中',
        resolved: '已解决',
        critical: '严重',
        high: '高',
        medium: '中',
        low: '低',
        lockedAccounts: '已锁定账户',
        type: '类型',
        severity: '严重程度',
        time: '时间',
        title: '风险管理',
        description: '检测和处理安全风险',
      },
      api: {
        title: 'API管理',
        createApiKey: '创建新API密钥',
        description: '管理API密钥和端点',
        totalApiKeys: '总API密钥',
        activeKeys: '活跃密钥',
        totalRequestsToday: '今日总请求',
        avgResponseTime: '平均响应时间',
        apiKeys: 'API密钥',
        apiKey: 'API密钥',
        lastUsed: '最后使用',
        requests: '请求',
        rateLimit: '速率限制',
        apiEndpoints: 'API端点',
        method: '方法',
        path: '路径',
        callsToday: '今日调用',
        avgResponse: '平均响应',
      },
      players: {
        totalPlayers: '总玩家数',
        activePlayers: '活跃玩家',
        inactivePlayers: '非活跃玩家',
        totalBalance: '总余额',
        username: '用户名',
        balance: '余额',
        registrationDate: '注册日期',
        description: '管理系统中的玩家',
      },
      profile: {
        description: '查看和管理您的个人资料信息',
        personalInfo: '个人信息',
        accountSecurity: '账户安全',
        changePassword: '更改密码',
        changePasswordDesc: '更新您的账户密码以提高安全性',
        twoFactorAuth: '双因素认证',
        twoFactorAuthDesc: '为您的账户添加额外的安全层',
        changePhoto: '更改照片',
      },
      userSettings: {
        description: '管理您的个人设置和偏好',
        notifications: '通知',
        appearance: '外观',
        privacy: '隐私',
        emailNotifications: '邮件通知',
        emailNotificationsDesc: '通过邮件接收通知',
        pushNotifications: '推送通知',
        pushNotificationsDesc: '在浏览器中接收推送通知',
        smsNotifications: '短信通知',
        smsNotificationsDesc: '通过短信接收通知',
        language: '语言',
        theme: '主题',
        light: '浅色',
        dark: '深色',
        auto: '自动',
        showEmail: '显示邮箱',
        showEmailDesc: '向其他用户显示您的邮箱地址',
        showPhone: '显示电话',
        showPhoneDesc: '向其他用户显示您的电话号码',
      },
      tables: {
        id: 'ID',
        player: '玩家',
        type: '类型',
        severity: '严重程度',
        description: '描述',
        status: '状态',
        time: '时间',
        actions: '操作',
        service: '服务',
        uptime: '运行时间',
        latency: '延迟',
        players: '玩家',
        gameName: '游戏名称',
        revenue: '收入',
        totalWagered: '总投注',
        game: '游戏',
        wagered: '投注',
      },
    },
    header: {
      providerPortal: '提供商门户',
      operatorPortal: '运营商门户',
      myProfile: '我的资料',
      helpSupport: '帮助与支持',
    },
    menu: {
      dashboard: '仪表板',
      gamesManagement: '游戏管理',
      operatorsManagement: '运营商管理',
      providerAccountsManagement: '提供商账户管理',
      rolesPermissionsManagement: '角色和权限管理',
      playersManagement: '玩家管理',
      transactions: '交易',
      walletPayment: '钱包和支付',
      promotionsBonus: '促销和奖金',
      reports: '报告和统计',
      analytics: '性能分析',
      monitoring: '监控',
      riskManagement: '风险管理',
      apiManagement: 'API管理',
      alerts: '警报和警告',
      auditLogs: '审计日志',
      systemSettings: '系统设置',
    },
    languages: {
      en: '英语',
      vi: '越南语',
      zh: '中文',
      th: '泰语',
      ja: '日语',
      ko: '韩语',
    },
  },
  th: {
    common: {
      search: 'ค้นหา',
      profile: 'โปรไฟล์',
      settings: 'การตั้งค่า',
      help: 'ช่วยเหลือ',
      logout: 'ออกจากระบบ',
      fullscreen: 'เต็มหน้าจอ',
      messages: 'ข้อความ',
      notifications: 'การแจ้งเตือน',
      viewAll: 'ดูทั้งหมด',
      language: 'ภาษา',
      user: 'ผู้ใช้',
      searchPlaceholder: 'ค้นหา...',
      searchBy: 'ค้นหาตาม',
      // Actions
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      delete: 'ลบ',
      editAction: 'แก้ไข',
      add: 'เพิ่ม',
      create: 'สร้าง',
      update: 'อัปเดต',
      submit: 'ส่ง',
      confirm: 'ยืนยัน',
      close: 'ปิด',
      back: 'กลับ',
      next: 'ถัดไป',
      previous: 'ก่อนหน้า',
      view: 'ดู',
      detailsAction: 'รายละเอียด',
      actions: 'การดำเนินการ',
      // Status
      status: 'สถานะ',
      active: 'ใช้งาน',
      inactive: 'ไม่ใช้งาน',
      success: 'สำเร็จ',
      error: 'ข้อผิดพลาด',
      loading: 'กำลังโหลด',
      yes: 'ใช่',
      no: 'ไม่',
      ok: 'ตกลง',
      // Login
      providerOperatorPortal: 'พอร์ทัลผู้ให้บริการและผู้ดำเนินการ',
      login: 'เข้าสู่ระบบ',
      welcome: 'ยินดีต้อนรับกลับ!',
      emailOrUsername: 'อีเมลหรือชื่อผู้ใช้',
      password: 'รหัสผ่าน',
      forgotPassword: 'ลืมรหัสผ่าน?',
      loggingIn: 'กำลังเข้าสู่ระบบ...',
      // Messages
      pleaseFillAllFields: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      loginSuccess: 'เข้าสู่ระบบสำเร็จ!',
      loginFailed: 'เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูลการเข้าสู่ระบบของคุณ',
      checkLoginInfo: 'เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูลการเข้าสู่ระบบของคุณ',
      // Table & List
      filter: 'กรอง',
      noData: 'ไม่มีข้อมูล',
      loadingData: 'กำลังโหลดข้อมูล...',
      showing: 'แสดง',
      to: 'ถึง',
      of: 'จาก',
      page: 'หน้า',
      // Status
      paused: 'หยุดชั่วคราว',
      banned: 'ถูกแบน',
      suspicious: 'กิจกรรมน่าสงสัย',
      // Actions
      creating: 'กำลังสร้าง...',
      deleting: 'กำลังลบ...',
      updating: 'กำลังอัปเดต...',
      saving: 'กำลังบันทึก...',
      // Forms
      name: 'ชื่อ',
      email: 'อีเมล',
      code: 'รหัส',
      description: 'คำอธิบาย',
      phone: 'เบอร์โทรศัพท์',
      username: 'ชื่อผู้ใช้',
      // Modals
      addNew: 'เพิ่มใหม่',
      confirmDelete: 'ยืนยันการลบ',
      deleteConfirmMessage: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถยกเลิกได้',
      // Placeholders
      enterName: 'ใส่ชื่อ...',
      enterEmail: 'ใส่อีเมล...',
      enterGameName: 'ใส่ชื่อเกม...',
      enterProviderAccountEmail: 'ใส่อีเมลบัญชีผู้ให้บริการ...',
      // Details
      createdAt: 'วันที่สร้าง',
      lastLogin: 'เข้าสู่ระบบล่าสุด',
      neverLoggedIn: 'ยังไม่เคยเข้าสู่ระบบ',
      additionalInfo: 'ข้อมูลเพิ่มเติม',
      edit: 'แก้ไข',
      // Dashboard
      overview: 'ภาพรวม',
      increased: 'เพิ่มขึ้น',
      decreased: 'ลดลง',
      weeklySales: 'ยอดขายรายสัปดาห์',
      weeklyOrders: 'คำสั่งซื้อรายสัปดาห์',
      visitorsOnline: 'ผู้เยี่ยมชมออนไลน์',
      visitAndSalesStatistics: 'สถิติการเยี่ยมชมและการขาย',
      trafficSources: 'แหล่งที่มาของการเข้าชม',
      searchEngines: 'เครื่องมือค้นหา',
      directClick: 'คลิกโดยตรง',
      bookmarksClick: 'คลิกบุ๊กมาร์ก',
      recentTickets: 'ตั๋วล่าสุด',
      assignee: 'ผู้รับผิดชอบ',
      subject: 'หัวข้อ',
      lastUpdate: 'อัปเดตล่าสุด',
      trackingId: 'ID ติดตาม',
      done: 'เสร็จสิ้น',
    },
    pages: {
      dashboard: {
        title: 'แดชบอร์ด',
        overview: 'ภาพรวม',
        weeklySales: 'ยอดขายรายสัปดาห์',
        weeklyOrders: 'คำสั่งซื้อรายสัปดาห์',
        visitorsOnline: 'ผู้เยี่ยมชมออนไลน์',
        visitAndSalesStatistics: 'สถิติการเยี่ยมชมและการขาย',
        trafficSources: 'แหล่งที่มาของการเข้าชม',
        searchEngines: 'เครื่องมือค้นหา',
        directClick: 'คลิกโดยตรง',
        bookmarksClick: 'คลิกบุ๊กมาร์ก',
        recentTickets: 'ตั๋วล่าสุด',
        assignee: 'ผู้รับผิดชอบ',
        subject: 'หัวข้อ',
        lastUpdate: 'อัปเดตล่าสุด',
        trackingId: 'ID ติดตาม',
        done: 'เสร็จสิ้น',
        increased: 'เพิ่มขึ้น',
        decreased: 'ลดลง',
      },
      operators: {
        title: 'จัดการผู้ดำเนินการ',
        addOperator: 'เพิ่มผู้ดำเนินการ',
        createOperator: 'สร้างผู้ดำเนินการ',
        deleteOperator: 'ลบผู้ดำเนินการ',
        operatorDetails: 'รายละเอียดผู้ดำเนินการ',
        searchPlaceholder: 'ค้นหาตามชื่อ อีเมล...',
        createSuccess: 'สร้างผู้ดำเนินการสำเร็จ!',
        createFailed: 'สร้างผู้ดำเนินการล้มเหลว กรุณาลองอีกครั้ง',
        deleteSuccess: 'ลบผู้ดำเนินการสำเร็จ!',
        deleteFailed: 'ลบผู้ดำเนินการล้มเหลว กรุณาลองอีกครั้ง',
        viewDetails: 'ดูรายละเอียด',
        deleteOperatorTitle: 'ลบผู้ดำเนินการ',
        description: 'จัดการและติดตามผู้ดำเนินการในระบบ',
        noOperatorsFound: 'ไม่พบผู้ดำเนินการ',
        noOperatorsYet: 'ยังไม่มีผู้ดำเนินการ',
        operatorCode: 'รหัสผู้ดำเนินการ',
        operatorName: 'ชื่อผู้ดำเนินการ',
        enterOperatorCode: 'ใส่รหัสผู้ดำเนินการ...',
        enterOperatorName: 'ใส่ชื่อผู้ดำเนินการ...',
        randomData: 'ข้อมูลแบบสุ่ม',
        random: 'สุ่ม',
        edit: 'แก้ไข',
        userNotFound: 'ไม่พบข้อมูลผู้ใช้',
        operatorsLabel: 'ผู้ดำเนินการ',
      },
      games: {
        title: 'จัดการเกม',
        addGame: 'เพิ่มเกม',
        createGame: 'สร้างเกม',
        searchPlaceholder: 'ค้นหาเกม...',
        description: 'จัดการและติดตามเกมในระบบ',
      },
      providerAccounts: {
        title: 'จัดการบัญชีผู้ให้บริการ',
        addAccount: 'เพิ่มบัญชีผู้ให้บริการ',
        createAccount: 'สร้างบัญชีผู้ให้บริการ',
        deleteAccount: 'ลบบัญชีผู้ให้บริการ',
        searchPlaceholder: 'ค้นหาตามชื่อ อีเมล รหัส...',
        createSuccess: 'สร้างบัญชีผู้ให้บริการสำเร็จ!',
        createFailed: 'สร้างบัญชีผู้ให้บริการล้มเหลว กรุณาลองอีกครั้ง',
        deleteSuccess: 'ลบบัญชีผู้ให้บริการสำเร็จ!',
        deleteFailed: 'ลบบัญชีผู้ให้บริการล้มเหลว กรุณาลองอีกครั้ง',
        deleteAccountTitle: 'ลบบัญชีผู้ให้บริการ',
        description: 'จัดการและติดตามบัญชีผู้ให้บริการในระบบ',
        totalAccounts: 'บัญชีทั้งหมด',
        activeAccounts: 'กำลังใช้งาน',
        loadingAccounts: 'กำลังโหลดรายการบัญชีผู้ให้บริการ...',
        providerAccount: 'บัญชีผู้ให้บริการ',
        noAccountsFound: 'ไม่พบบัญชีผู้ให้บริการ',
        noAccountsYet: 'ยังไม่มีบัญชีผู้ให้บริการ',
        randomData: 'ข้อมูลแบบสุ่ม',
        random: 'สุ่ม',
      },
      roles: {
        title: 'จัดการบทบาท',
        addRole: 'เพิ่มบทบาท',
        createRole: 'สร้างบทบาท',
        deleteRole: 'ลบบทบาท',
        searchPlaceholder: 'ค้นหาบทบาท...',
        createSuccess: 'สร้างบทบาทสำเร็จ!',
        createFailed: 'สร้างบทบาทล้มเหลว กรุณาลองอีกครั้ง',
        deleteSuccess: 'ลบบทบาทสำเร็จ!',
        deleteFailed: 'ลบบทบาทล้มเหลว กรุณาลองอีกครั้ง',
        role: 'บทบาท',
        permissions: 'สิทธิ์',
        noRolesFound: 'ไม่พบบทบาท',
        noRolesYet: 'ยังไม่มีบทบาท',
        loadingRoles: 'กำลังโหลดรายการบทบาท...',
        loadingPermissions: 'กำลังโหลดรายการสิทธิ์...',
        operatorAccounts: 'บัญชีผู้ดำเนินการ',
        operatorAccount: 'บัญชีผู้ดำเนินการ',
        selectPermissions: 'เลือกสิทธิ์',
      },
      permissions: {
        title: 'จัดการสิทธิ์',
        addPermission: 'เพิ่มสิทธิ์',
        createPermission: 'สร้างสิทธิ์',
        deletePermission: 'ลบสิทธิ์',
        searchPlaceholder: 'ค้นหาสิทธิ์...',
        createSuccess: 'สร้างสิทธิ์สำเร็จ!',
        createFailed: 'สร้างสิทธิ์ล้มเหลว กรุณาลองอีกครั้ง',
        deleteSuccess: 'ลบสิทธิ์สำเร็จ!',
        deleteFailed: 'ลบสิทธิ์ล้มเหลว กรุณาลองอีกครั้ง',
      },
      wallet: {
        title: 'กระเป๋าเงินและการชำระเงิน',
        addMethod: 'เพิ่มวิธีการชำระเงิน',
        totalMethods: 'วิธีการชำระเงินทั้งหมด',
        activeMethods: 'วิธีการที่ใช้งาน',
        totalDailyLimit: 'ขีดจำกัดรายวันทั้งหมด',
        dailyLimit: 'ขีดจำกัดรายวัน',
        monthlyLimit: 'ขีดจำกัดรายเดือน',
        bank: 'ธนาคาร',
        ewallet: 'กระเป๋าเงินอิเล็กทรอนิกส์',
        gateway: 'เกตเวย์การชำระเงิน',
        description: 'จัดการวิธีการชำระเงินและการตั้งค่ากระเป๋าเงิน',
      },
      promotions: {
        title: 'โปรโมชั่นและโบนัส',
        createPromotion: 'สร้างโปรโมชั่น',
        totalPrograms: 'โปรแกรมทั้งหมด',
        ongoing: 'กำลังดำเนินการ',
        totalParticipants: 'ผู้เข้าร่วมทั้งหมด',
        totalBonusAwarded: 'โบนัสที่มอบให้ทั้งหมด',
        programName: 'ชื่อโปรแกรม',
        bonus: 'โบนัส',
        maxBonus: 'โบนัสสูงสุด',
        participants: 'ผู้เข้าร่วม',
        startDate: 'วันที่เริ่มต้น',
        endDate: 'วันที่สิ้นสุด',
        firstDeposit: 'การฝากครั้งแรก',
        deposit: 'การฝากเงิน',
        cashback: 'เงินคืน',
        tournament: 'การแข่งขัน',
        rebate: 'เงินคืน',
        upcoming: 'กำลังจะมาถึง',
        expired: 'หมดอายุ',
        to: 'ถึง',
        description: 'จัดการโปรโมชั่นและโปรแกรมโบนัส',
      },
      transactions: {
        title: 'ธุรกรรม',
        searchPlaceholder: 'ค้นหาธุรกรรม (ID, ผู้เล่น)...',
        exportReport: 'ส่งออกรายงาน',
        totalTransactionsToday: 'ธุรกรรมทั้งหมดวันนี้',
        totalDeposit: 'การฝากเงินทั้งหมด',
        totalWithdraw: 'การถอนเงินทั้งหมด',
        pendingProcessing: 'รอดำเนินการ',
        transactionCode: 'รหัสธุรกรรม',
        amount: 'จำนวนเงิน',
        paymentMethod: 'วิธีการชำระเงิน',
        time: 'เวลา',
        deposit: 'ฝากเงิน',
        withdraw: 'ถอนเงิน',
        bet: 'เดิมพัน',
        completed: 'เสร็จสมบูรณ์',
        rejected: 'ปฏิเสธ',
        description: 'ดูและจัดการธุรกรรมทั้งหมดในระบบ',
      },
      auditLogs: {
        title: 'บันทึกการตรวจสอบ',
        searchPlaceholder: 'ค้นหาบันทึก (ผู้ใช้, การกระทำ, ทรัพยากร)...',
        description: 'บันทึกกิจกรรมและการเข้าถึงระบบ',
        exportLogs: 'ส่งออกบันทึก',
        time: 'เวลา',
        user: 'ผู้ใช้',
        action: 'การกระทำ',
        resource: 'ทรัพยากร',
        ipAddress: 'ที่อยู่ IP',
        login: 'เข้าสู่ระบบ',
        logout: 'ออกจากระบบ',
        updatePlayer: 'อัปเดตผู้เล่น',
        createPromotion: 'สร้างโปรโมชั่น',
        deleteGame: 'ลบเกม',
        changeSettings: 'เปลี่ยนการตั้งค่า',
        viewSensitiveData: 'ดูข้อมูลที่ละเอียดอ่อน',
      },
      settings: {
        title: 'การตั้งค่าระบบ',
        saveSettings: 'บันทึกการตั้งค่า',
        generalSettings: 'การตั้งค่าทั่วไป',
        notificationSettings: 'การตั้งค่าการแจ้งเตือน',
        securitySettings: 'ความปลอดภัย',
        paymentSettings: 'การตั้งค่าการชำระเงิน',
        systemName: 'ชื่อระบบ',
        systemDescription: 'คำอธิบาย',
        defaultLanguage: 'ภาษาเริ่มต้น',
        emailNotification: 'การแจ้งเตือนทางอีเมล',
        emailNotificationDesc: 'ส่งอีเมลเมื่อมีเหตุการณ์สำคัญ',
        pushNotification: 'การแจ้งเตือนแบบ Push',
        pushNotificationDesc: 'แจ้งเตือนไปยังผู้ดูแลระบบ',
        smsAlert: 'การแจ้งเตือน SMS',
        smsAlertDesc: 'ส่ง SMS สำหรับการแจ้งเตือนที่สำคัญ',
        security: 'ความปลอดภัย',
        sessionTimeout: 'เวลาหมดอายุของเซสชัน (นาที)',
        maxLoginAttempts: 'จำนวนครั้งที่เข้าสู่ระบบผิดพลาดสูงสุด',
        require2FA: 'ต้องการ 2FA',
        require2FADesc: 'การยืนยันตัวตนสองปัจจัยสำหรับผู้ดูแลระบบ',
        minDepositLimit: 'ขีดจำกัดการฝากขั้นต่ำ (บาท)',
        minWithdrawLimit: 'ขีดจำกัดการถอนขั้นต่ำ (บาท)',
        withdrawProcessingTime: 'เวลาประมวลผลการถอน (ชั่วโมง)',
        description: 'กำหนดค่าการตั้งค่าและความชอบของระบบ',
      },
      alerts: {
        totalAlerts: 'การแจ้งเตือนทั้งหมด',
        unread: 'ยังไม่ได้อ่าน',
        warning: 'คำเตือน',
        totalAlertsLabel: 'การแจ้งเตือนทั้งหมด',
        description: 'ดูและจัดการการแจ้งเตือนและแจ้งเตือนระบบ',
      },
      reports: {
        exportPdf: 'ส่งออก PDF',
        exportExcel: 'ส่งออก Excel',
        monthlyRevenue: 'รายได้เดือนนี้',
        profit: 'กำไร',
        revenueByMonth: 'รายได้ตามเดือน',
        revenue: 'รายได้',
        winRate: 'อัตราชนะ',
        comparedToLastMonth: '↑ % เทียบกับเดือนที่แล้ว',
        description: 'ดูและส่งออกรายงานและสถิติระบบ',
      },
      analytics: {
        registration: 'การลงทะเบียน',
        firstDeposit: 'การฝากครั้งแรก',
        playGame: 'เล่นเกม',
        activeUsers: 'ผู้ใช้ที่ใช้งาน',
        revenuePerDay: 'รายได้/วัน',
        sessions: 'เซสชัน',
        conversionRate: 'อัตราการแปลง',
        performanceLast5Days: 'ประสิทธิภาพ 5 วันที่ผ่านมา',
        conversionRateChart: 'อัตราการแปลง',
        revenueTrend: 'แนวโน้มรายได้',
        comparedToYesterday: '↑ % เทียบกับเมื่อวาน',
        description: 'ดูการวิเคราะห์ประสิทธิภาพและตัวชี้วัด',
      },
      monitoring: {
        online: 'ออนไลน์',
        offline: 'ออฟไลน์',
        warning: 'คำเตือน',
        systemStatus: 'สถานะระบบ',
        service: 'บริการ',
        uptime: 'เวลาทำงาน',
        latency: 'ความหน่วง',
        avgUptime: 'เวลาทำงานเฉลี่ย',
        totalServices: 'บริการทั้งหมด',
        recentEvents: 'เหตุการณ์ล่าสุด',
        description: 'ตรวจสอบบริการและประสิทธิภาพของระบบ',
      },
      risk: {
        totalAlerts: 'การแจ้งเตือนความเสี่ยงทั้งหมด',
        fraud: 'การฉ้อโกง',
        unusualPattern: 'รูปแบบผิดปกติ',
        accountCompromise: 'บัญชีถูกบุกรุก',
        pending: 'รอดำเนินการ',
        investigating: 'กำลังสอบสวน',
        resolved: 'แก้ไขแล้ว',
        critical: 'วิกฤต',
        high: 'สูง',
        medium: 'ปานกลาง',
        low: 'ต่ำ',
        lockedAccounts: 'บัญชีที่ถูกล็อค',
        type: 'ประเภท',
        severity: 'ระดับความรุนแรง',
        time: 'เวลา',
        title: 'การจัดการความเสี่ยง',
        description: 'ตรวจจับและจัดการความเสี่ยงด้านความปลอดภัย',
      },
      api: {
        title: 'การจัดการ API',
        createApiKey: 'สร้าง API Key ใหม่',
        description: 'จัดการ API keys และ endpoints',
        totalApiKeys: 'API Keys ทั้งหมด',
        activeKeys: 'Keys ที่ใช้งาน',
        totalRequestsToday: 'คำขอทั้งหมดวันนี้',
        avgResponseTime: 'เวลาตอบสนองเฉลี่ย',
        apiKeys: 'API Keys',
        apiKey: 'API Key',
        lastUsed: 'ใช้งานล่าสุด',
        requests: 'คำขอ',
        rateLimit: 'อัตราการจำกัด',
        apiEndpoints: 'API Endpoints',
        method: 'วิธี',
        path: 'เส้นทาง',
        callsToday: 'การเรียกวันนี้',
        avgResponse: 'การตอบสนองเฉลี่ย',
      },
      players: {
        totalPlayers: 'ผู้เล่นทั้งหมด',
        activePlayers: 'ผู้เล่นที่ใช้งาน',
        inactivePlayers: 'ผู้เล่นที่ไม่ใช้งาน',
        totalBalance: 'ยอดรวม',
        username: 'ชื่อผู้ใช้',
        balance: 'ยอดเงิน',
        registrationDate: 'วันที่ลงทะเบียน',
        description: 'จัดการและติดตามผู้เล่นในระบบ',
      },
      profile: {
        description: 'ดูและจัดการข้อมูลโปรไฟล์ส่วนตัวของคุณ',
        personalInfo: 'ข้อมูลส่วนตัว',
        accountSecurity: 'ความปลอดภัยของบัญชี',
        changePassword: 'เปลี่ยนรหัสผ่าน',
        changePasswordDesc: 'อัปเดตรหัสผ่านบัญชีของคุณเพื่อความปลอดภัยที่ดีขึ้น',
        twoFactorAuth: 'การยืนยันตัวตนสองปัจจัย',
        twoFactorAuthDesc: 'เพิ่มชั้นความปลอดภัยเพิ่มเติมให้กับบัญชีของคุณ',
        changePhoto: 'เปลี่ยนรูปภาพ',
      },
      userSettings: {
        description: 'จัดการการตั้งค่าและความชอบส่วนตัวของคุณ',
        notifications: 'การแจ้งเตือน',
        appearance: 'รูปลักษณ์',
        privacy: 'ความเป็นส่วนตัว',
        emailNotifications: 'การแจ้งเตือนทางอีเมล',
        emailNotificationsDesc: 'รับการแจ้งเตือนทางอีเมล',
        pushNotifications: 'การแจ้งเตือนแบบ Push',
        pushNotificationsDesc: 'รับการแจ้งเตือนแบบ push ในเบราว์เซอร์',
        smsNotifications: 'การแจ้งเตือน SMS',
        smsNotificationsDesc: 'รับการแจ้งเตือนทาง SMS',
        language: 'ภาษา',
        theme: 'ธีม',
        light: 'สว่าง',
        dark: 'มืด',
        auto: 'อัตโนมัติ',
        showEmail: 'แสดงอีเมล',
        showEmailDesc: 'แสดงที่อยู่อีเมลของคุณให้ผู้ใช้คนอื่นเห็น',
        showPhone: 'แสดงเบอร์โทรศัพท์',
        showPhoneDesc: 'แสดงเบอร์โทรศัพท์ของคุณให้ผู้ใช้คนอื่นเห็น',
      },
      tables: {
        id: 'ID',
        player: 'ผู้เล่น',
        type: 'ประเภท',
        severity: 'ระดับความรุนแรง',
        description: 'คำอธิบาย',
        status: 'สถานะ',
        time: 'เวลา',
        actions: 'การดำเนินการ',
        service: 'บริการ',
        uptime: 'เวลาทำงาน',
        latency: 'ความหน่วง',
        players: 'ผู้เล่น',
        gameName: 'ชื่อเกม',
        revenue: 'รายได้',
        totalWagered: 'ยอดเดิมพันรวม',
        game: 'เกม',
        wagered: 'ยอดเดิมพัน',
      },
    },
    header: {
      providerPortal: 'พอร์ทัลผู้ให้บริการ',
      operatorPortal: 'พอร์ทัลผู้ดำเนินการ',
      myProfile: 'โปรไฟล์ของฉัน',
      helpSupport: 'ช่วยเหลือและสนับสนุน',
    },
    menu: {
      dashboard: 'แดชบอร์ด',
      gamesManagement: 'จัดการเกม',
      operatorsManagement: 'จัดการผู้ดำเนินการ',
      providerAccountsManagement: 'จัดการบัญชีผู้ให้บริการ',
      rolesPermissionsManagement: 'จัดการบทบาทและสิทธิ์',
      playersManagement: 'จัดการผู้เล่น',
      transactions: 'ธุรกรรม',
      walletPayment: 'กระเป๋าเงินและการชำระเงิน',
      promotionsBonus: 'โปรโมชั่นและโบนัส',
      reports: 'รายงานและสถิติ',
      analytics: 'การวิเคราะห์ประสิทธิภาพ',
      monitoring: 'การตรวจสอบ',
      riskManagement: 'การจัดการความเสี่ยง',
      apiManagement: 'การจัดการ API',
      alerts: 'การแจ้งเตือนและคำเตือน',
      auditLogs: 'บันทึกการตรวจสอบ',
      systemSettings: 'การตั้งค่าระบบ',
    },
    languages: {
      en: 'อังกฤษ',
      vi: 'เวียดนาม',
      zh: 'จีน',
      th: 'ไทย',
      ja: 'ญี่ปุ่น',
      ko: 'เกาหลี',
    },
  },
  ja: {
    common: {
      search: '検索',
      profile: 'プロフィール',
      settings: '設定',
      help: 'ヘルプ',
      logout: 'ログアウト',
      fullscreen: '全画面',
      messages: 'メッセージ',
      notifications: '通知',
      viewAll: 'すべて表示',
      language: '言語',
      user: 'ユーザー',
      searchPlaceholder: '検索...',
      searchBy: '検索',
      // Actions
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      editAction: '編集',
      add: '追加',
      create: '作成',
      update: '更新',
      submit: '送信',
      confirm: '確認',
      close: '閉じる',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      view: '表示',
      detailsAction: '詳細',
      actions: '操作',
      // Status
      status: 'ステータス',
      active: 'アクティブ',
      inactive: '非アクティブ',
      success: '成功',
      error: 'エラー',
      loading: '読み込み中',
      yes: 'はい',
      no: 'いいえ',
      ok: 'OK',
      // Login
      providerOperatorPortal: 'プロバイダー＆オペレーター ポータル',
      login: 'ログイン',
      welcome: 'おかえりなさい！',
      emailOrUsername: 'メールアドレスまたはユーザー名',
      password: 'パスワード',
      forgotPassword: 'パスワードを忘れた場合',
      loggingIn: 'ログイン中...',
      // Messages
      pleaseFillAllFields: 'すべてのフィールドに入力してください',
      loginSuccess: 'ログインに成功しました！',
      loginFailed: 'ログインに失敗しました。ログイン情報を確認してください。',
      checkLoginInfo: 'ログインに失敗しました。ログイン情報を確認してください。',
      // Table & List
      filter: 'フィルター',
      noData: 'データがありません',
      loadingData: 'データを読み込み中...',
      showing: '表示中',
      to: 'から',
      of: '件中',
      page: 'ページ',
      // Status
      paused: '一時停止',
      banned: '禁止',
      suspicious: '不審な活動',
      // Actions
      creating: '作成中...',
      deleting: '削除中...',
      updating: '更新中...',
      saving: '保存中...',
      // Forms
      name: '名前',
      email: 'メール',
      code: 'コード',
      description: '説明',
      phone: '電話',
      username: 'ユーザー名',
      // Modals
      addNew: '新規追加',
      confirmDelete: '削除の確認',
      deleteConfirmMessage: 'この項目を削除してもよろしいですか？この操作は元に戻せません。',
      // Placeholders
      enterName: '名前を入力...',
      enterEmail: 'メールを入力...',
      enterGameName: 'ゲーム名を入力...',
      enterProviderAccountEmail: 'プロバイダーアカウントのメールを入力...',
      // Details
      createdAt: '作成日',
      lastLogin: '最終ログイン',
      neverLoggedIn: 'ログインしたことがありません',
      additionalInfo: '追加情報',
      edit: '編集',
      // Dashboard
      overview: '概要',
      increased: '増加',
      decreased: '減少',
      weeklySales: '週間売上',
      weeklyOrders: '週間注文',
      visitorsOnline: 'オンライン訪問者',
      visitAndSalesStatistics: '訪問と売上の統計',
      trafficSources: 'トラフィックソース',
      searchEngines: '検索エンジン',
      directClick: '直接クリック',
      bookmarksClick: 'ブックマーククリック',
      recentTickets: '最近のチケット',
      assignee: '担当者',
      subject: '件名',
      lastUpdate: '最終更新',
      trackingId: 'トラッキングID',
      done: '完了',
    },
    pages: {
      dashboard: {
        title: 'ダッシュボード',
        overview: '概要',
        weeklySales: '週間売上',
        weeklyOrders: '週間注文',
        visitorsOnline: 'オンライン訪問者',
        visitAndSalesStatistics: '訪問と売上の統計',
        trafficSources: 'トラフィックソース',
        searchEngines: '検索エンジン',
        directClick: '直接クリック',
        bookmarksClick: 'ブックマーククリック',
        recentTickets: '最近のチケット',
        assignee: '担当者',
        subject: '件名',
        lastUpdate: '最終更新',
        trackingId: 'トラッキングID',
        done: '完了',
        increased: '増加',
        decreased: '減少',
      },
      operators: {
        title: 'オペレーター管理',
        addOperator: 'オペレーターを追加',
        createOperator: 'オペレーターを作成',
        deleteOperator: 'オペレーターを削除',
        operatorDetails: 'オペレーター詳細',
        searchPlaceholder: '名前、メールで検索...',
        createSuccess: 'オペレーターの作成に成功しました！',
        createFailed: 'オペレーターの作成に失敗しました。もう一度お試しください。',
        deleteSuccess: 'オペレーターの削除に成功しました！',
        deleteFailed: 'オペレーターの削除に失敗しました。もう一度お試しください。',
        viewDetails: '詳細を表示',
        deleteOperatorTitle: 'オペレーターを削除',
        description: 'システム内のオペレーターを管理および追跡',
        noOperatorsFound: 'オペレーターが見つかりません',
        noOperatorsYet: 'オペレーターがまだありません',
        operatorCode: 'オペレーターコード',
        operatorName: 'オペレーター名',
        enterOperatorCode: 'オペレーターコードを入力...',
        enterOperatorName: 'オペレーター名を入力...',
        randomData: 'ランダムデータ',
        random: 'ランダム',
        edit: '編集',
        userNotFound: 'ユーザー情報が見つかりません',
        operatorsLabel: 'オペレーター',
      },
      games: {
        title: 'ゲーム管理',
        addGame: 'ゲームを追加',
        createGame: 'ゲームを作成',
        searchPlaceholder: 'ゲームを検索...',
        description: 'システム内のゲームを管理および追跡',
      },
      providerAccounts: {
        title: 'プロバイダーアカウント管理',
        addAccount: 'プロバイダーアカウントを追加',
        createAccount: 'プロバイダーアカウントを作成',
        deleteAccount: 'プロバイダーアカウントを削除',
        searchPlaceholder: '名前、メール、コードで検索...',
        createSuccess: 'プロバイダーアカウントの作成に成功しました！',
        createFailed: 'プロバイダーアカウントの作成に失敗しました。もう一度お試しください。',
        deleteSuccess: 'プロバイダーアカウントの削除に成功しました！',
        deleteFailed: 'プロバイダーアカウントの削除に失敗しました。もう一度お試しください。',
        deleteAccountTitle: 'プロバイダーアカウントを削除',
        description: 'システム内のプロバイダーアカウントを管理および追跡',
        totalAccounts: '総アカウント数',
        activeAccounts: 'アクティブ',
        loadingAccounts: 'プロバイダーアカウントリストを読み込み中...',
        providerAccount: 'プロバイダーアカウント',
        noAccountsFound: 'プロバイダーアカウントが見つかりません',
        noAccountsYet: 'プロバイダーアカウントがまだありません',
        randomData: 'ランダムデータ',
        random: 'ランダム',
      },
      roles: {
        title: 'ロール管理',
        addRole: 'ロールを追加',
        createRole: 'ロールを作成',
        deleteRole: 'ロールを削除',
        searchPlaceholder: 'ロールを検索...',
        createSuccess: 'ロールの作成に成功しました！',
        createFailed: 'ロールの作成に失敗しました。もう一度お試しください。',
        deleteSuccess: 'ロールの削除に成功しました！',
        deleteFailed: 'ロールの削除に失敗しました。もう一度お試しください。',
        role: 'ロール',
        permissions: '権限',
        noRolesFound: 'ロールが見つかりません',
        noRolesYet: 'ロールがまだありません',
        loadingRoles: 'ロールリストを読み込み中...',
        loadingPermissions: '権限リストを読み込み中...',
        operatorAccounts: 'オペレーターアカウント',
        operatorAccount: 'オペレーターアカウント',
        selectPermissions: '権限を選択',
      },
      permissions: {
        title: '権限管理',
        addPermission: '権限を追加',
        createPermission: '権限を作成',
        deletePermission: '権限を削除',
        searchPlaceholder: '権限を検索...',
        createSuccess: '権限の作成に成功しました！',
        createFailed: '権限の作成に失敗しました。もう一度お試しください。',
        deleteSuccess: '権限の削除に成功しました！',
        deleteFailed: '権限の削除に失敗しました。もう一度お試しください。',
      },
      wallet: {
        title: 'ウォレットと支払い',
        addMethod: '支払い方法を追加',
        totalMethods: '総支払い方法',
        activeMethods: 'アクティブ方法',
        totalDailyLimit: '総日次制限',
        dailyLimit: '日次制限',
        monthlyLimit: '月次制限',
        bank: '銀行',
        ewallet: '電子ウォレット',
        gateway: '支払いゲートウェイ',
        description: '支払い方法とウォレット設定の管理',
      },
      promotions: {
        title: 'プロモーションとボーナス',
        createPromotion: 'プロモーションを作成',
        totalPrograms: 'プログラム総数',
        ongoing: '進行中',
        totalParticipants: '総参加者数',
        totalBonusAwarded: '付与された総ボーナス',
        programName: 'プログラム名',
        bonus: 'ボーナス',
        maxBonus: '最大ボーナス',
        participants: '参加者',
        startDate: '開始日',
        endDate: '終了日',
        firstDeposit: '初回入金',
        deposit: '入金',
        cashback: 'キャッシュバック',
        tournament: 'トーナメント',
        rebate: 'リベート',
        upcoming: '近日開始',
        expired: '期限切れ',
        to: 'まで',
        description: 'プロモーションとボーナスプログラムの管理',
      },
      transactions: {
        title: '取引',
        searchPlaceholder: '取引を検索（ID、プレイヤー）...',
        exportReport: 'レポートをエクスポート',
        totalTransactionsToday: '今日の総取引',
        totalDeposit: '総入金',
        totalWithdraw: '総出金',
        pendingProcessing: '処理待ち',
        transactionCode: '取引コード',
        amount: '金額',
        paymentMethod: '支払い方法',
        time: '時間',
        deposit: '入金',
        withdraw: '出金',
        bet: 'ベット',
        completed: '完了',
        rejected: '拒否',
        description: 'システム内のすべての取引を表示および管理',
      },
      auditLogs: {
        title: '監査ログ',
        searchPlaceholder: 'ログを検索（ユーザー、アクション、リソース）...',
        description: 'システム活動とアクセスログ',
        exportLogs: 'ログをエクスポート',
        time: '時間',
        user: 'ユーザー',
        action: 'アクション',
        resource: 'リソース',
        ipAddress: 'IPアドレス',
        login: 'ログイン',
        logout: 'ログアウト',
        updatePlayer: 'プレイヤーを更新',
        createPromotion: 'プロモーションを作成',
        deleteGame: 'ゲームを削除',
        changeSettings: '設定を変更',
        viewSensitiveData: '機密データを表示',
      },
      settings: {
        title: 'システム設定',
        saveSettings: '設定を保存',
        generalSettings: '一般設定',
        notificationSettings: '通知設定',
        securitySettings: 'セキュリティ',
        paymentSettings: '支払い設定',
        systemName: 'システム名',
        systemDescription: '説明',
        defaultLanguage: 'デフォルト言語',
        emailNotification: 'メール通知',
        emailNotificationDesc: '重要なイベント時にメールを送信',
        pushNotification: 'プッシュ通知',
        pushNotificationDesc: '管理者にプッシュ通知を送信',
        smsAlert: 'SMSアラート',
        smsAlertDesc: '重要なアラート時にSMSを送信',
        security: 'セキュリティ',
        sessionTimeout: 'セッションタイムアウト（分）',
        maxLoginAttempts: '最大ログイン試行回数',
        require2FA: '2FAを要求',
        require2FADesc: '管理者に二要素認証を要求',
        minDepositLimit: '最小入金限度額（VND）',
        minWithdrawLimit: '最小出金限度額（VND）',
        withdrawProcessingTime: '出金処理時間（時間）',
        description: 'システム設定と環境設定の構成',
      },
      alerts: {
        totalAlerts: 'アラート総数',
        unread: '未読',
        warning: '警告',
        totalAlertsLabel: 'アラート総数',
        description: 'システムアラートと通知の表示と管理',
      },
      reports: {
        exportPdf: 'PDFをエクスポート',
        exportExcel: 'Excelをエクスポート',
        monthlyRevenue: '今月の収益',
        profit: '利益',
        revenueByMonth: '月別収益',
        revenue: '収益',
        winRate: '勝率',
        comparedToLastMonth: '↑ % 先月比',
        description: 'システムレポートと統計の表示とエクスポート',
      },
      analytics: {
        registration: '登録',
        firstDeposit: '初回入金',
        playGame: 'ゲーム',
        activeUsers: 'アクティブユーザー',
        revenuePerDay: '1日あたりの収益',
        sessions: 'セッション',
        conversionRate: 'コンバージョン率',
        performanceLast5Days: '過去5日のパフォーマンス',
        conversionRateChart: 'コンバージョン率',
        revenueTrend: '収益トレンド',
        comparedToYesterday: '↑ % 昨日比',
        description: 'パフォーマンス分析とメトリクスの表示',
      },
      monitoring: {
        online: 'オンライン',
        offline: 'オフライン',
        warning: '警告',
        systemStatus: 'システム状態',
        service: 'サービス',
        uptime: '稼働時間',
        latency: 'レイテンシ',
        avgUptime: '平均稼働時間',
        totalServices: 'サービス総数',
        recentEvents: '最近のイベント',
        description: 'システムサービスとパフォーマンスの監視',
      },
      risk: {
        totalAlerts: 'リスクアラート総数',
        fraud: '詐欺',
        unusualPattern: '異常パターン',
        accountCompromise: 'アカウント侵害',
        pending: '保留中',
        investigating: '調査中',
        resolved: '解決済み',
        critical: '重大',
        high: '高',
        medium: '中',
        low: '低',
        lockedAccounts: 'ロックされたアカウント',
        type: 'タイプ',
        severity: '深刻度',
        time: '時間',
        title: 'リスク管理',
        description: 'セキュリティリスクの検出と処理',
      },
      api: {
        title: 'API管理',
        createApiKey: '新しいAPIキーを作成',
        description: 'APIキーとエンドポイントの管理',
        totalApiKeys: 'APIキー総数',
        activeKeys: 'アクティブキー',
        totalRequestsToday: '今日の総リクエスト',
        avgResponseTime: '平均応答時間',
        apiKeys: 'APIキー',
        apiKey: 'APIキー',
        lastUsed: '最終使用',
        requests: 'リクエスト',
        rateLimit: 'レート制限',
        apiEndpoints: 'APIエンドポイント',
        method: 'メソッド',
        path: 'パス',
        callsToday: '今日の呼び出し',
        avgResponse: '平均応答',
      },
      players: {
        totalPlayers: '総プレイヤー数',
        activePlayers: 'アクティブプレイヤー',
        inactivePlayers: '非アクティブプレイヤー',
        totalBalance: '総残高',
        username: 'ユーザー名',
        balance: '残高',
        registrationDate: '登録日',
        description: 'システム内のプレイヤーを管理および追跡',
      },
      profile: {
        description: '個人プロフィール情報の表示と管理',
        personalInfo: '個人情報',
        accountSecurity: 'アカウントセキュリティ',
        changePassword: 'パスワード変更',
        changePasswordDesc: 'アカウントのセキュリティを向上させるためにパスワードを更新',
        twoFactorAuth: '二要素認証',
        twoFactorAuthDesc: 'アカウントに追加のセキュリティ層を追加',
        changePhoto: '写真を変更',
      },
      userSettings: {
        description: '個人設定と環境設定の管理',
        notifications: '通知',
        appearance: '外観',
        privacy: 'プライバシー',
        emailNotifications: 'メール通知',
        emailNotificationsDesc: 'メールで通知を受信',
        pushNotifications: 'プッシュ通知',
        pushNotificationsDesc: 'ブラウザでプッシュ通知を受信',
        smsNotifications: 'SMS通知',
        smsNotificationsDesc: 'SMSで通知を受信',
        language: '言語',
        theme: 'テーマ',
        light: 'ライト',
        dark: 'ダーク',
        auto: '自動',
        showEmail: 'メールを表示',
        showEmailDesc: '他のユーザーにメールアドレスを表示',
        showPhone: '電話を表示',
        showPhoneDesc: '他のユーザーに電話番号を表示',
      },
      tables: {
        id: 'ID',
        player: 'プレイヤー',
        type: 'タイプ',
        severity: '深刻度',
        description: '説明',
        status: 'ステータス',
        time: '時間',
        actions: '操作',
        service: 'サービス',
        uptime: '稼働時間',
        latency: 'レイテンシ',
        players: 'プレイヤー',
        gameName: 'ゲーム名',
        revenue: '収益',
        totalWagered: '総ベット',
        game: 'ゲーム',
        wagered: 'ベット',
      },
    },
    header: {
      providerPortal: 'プロバイダーポータル',
      operatorPortal: 'オペレーターポータル',
      myProfile: 'マイプロフィール',
      helpSupport: 'ヘルプとサポート',
    },
    menu: {
      dashboard: 'ダッシュボード',
      gamesManagement: 'ゲーム管理',
      operatorsManagement: 'オペレーター管理',
      providerAccountsManagement: 'プロバイダーアカウント管理',
      rolesPermissionsManagement: 'ロールと権限管理',
      playersManagement: 'プレイヤー管理',
      transactions: '取引',
      walletPayment: 'ウォレットと支払い',
      promotionsBonus: 'プロモーションとボーナス',
      reports: 'レポートと統計',
      analytics: 'パフォーマンス分析',
      monitoring: 'モニタリング',
      riskManagement: 'リスク管理',
      apiManagement: 'API管理',
      alerts: 'アラートと警告',
      auditLogs: '監査ログ',
      systemSettings: 'システム設定',
    },
    languages: {
      en: '英語',
      vi: 'ベトナム語',
      zh: '中国語',
      th: 'タイ語',
      ja: '日本語',
      ko: '韓国語',
    },
  },
  ko: {
    common: {
      search: '검색',
      profile: '프로필',
      settings: '설정',
      help: '도움말',
      logout: '로그아웃',
      fullscreen: '전체 화면',
      messages: '메시지',
      notifications: '알림',
      viewAll: '모두 보기',
      language: '언어',
      user: '사용자',
      searchPlaceholder: '검색...',
      searchBy: '검색',
      // Actions
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      editAction: '편집',
      add: '추가',
      create: '생성',
      update: '업데이트',
      submit: '제출',
      confirm: '확인',
      close: '닫기',
      back: '뒤로',
      next: '다음',
      previous: '이전',
      view: '보기',
      detailsAction: '세부 정보',
      actions: '작업',
      // Status
      status: '상태',
      active: '활성',
      inactive: '비활성',
      success: '성공',
      error: '오류',
      loading: '로딩 중',
      yes: '예',
      no: '아니오',
      ok: '확인',
      // Login
      providerOperatorPortal: '제공자 및 운영자 포털',
      login: '로그인',
      welcome: '다시 오신 것을 환영합니다!',
      emailOrUsername: '이메일 또는 사용자 이름',
      password: '비밀번호',
      forgotPassword: '비밀번호를 잊으셨나요?',
      loggingIn: '로그인 중...',
      // Messages
      pleaseFillAllFields: '모든 필드를 입력해주세요',
      loginSuccess: '로그인 성공!',
      loginFailed: '로그인 실패. 로그인 정보를 확인해주세요.',
      checkLoginInfo: '로그인 실패. 로그인 정보를 확인해주세요.',
      // Table & List
      filter: '필터',
      noData: '데이터가 없습니다',
      loadingData: '데이터 로딩 중...',
      showing: '표시',
      to: '부터',
      of: '중',
      page: '페이지',
      // Status
      paused: '일시 중지',
      banned: '차단됨',
      suspicious: '의심스러운 활동',
      // Actions
      creating: '생성 중...',
      deleting: '삭제 중...',
      updating: '업데이트 중...',
      saving: '저장 중...',
      // Forms
      name: '이름',
      email: '이메일',
      code: '코드',
      description: '설명',
      phone: '전화번호',
      username: '사용자 이름',
      // Modals
      addNew: '새로 추가',
      confirmDelete: '삭제 확인',
      deleteConfirmMessage: '이 항목을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
      // Placeholders
      enterName: '이름 입력...',
      enterEmail: '이메일 입력...',
      enterGameName: '게임 이름 입력...',
      enterProviderAccountEmail: '제공자 계정 이메일 입력...',
      // Details
      createdAt: '생성일',
      lastLogin: '마지막 로그인',
      neverLoggedIn: '로그인한 적 없음',
      additionalInfo: '추가 정보',
      edit: '편집',
      // Dashboard
      overview: '개요',
      increased: '증가',
      decreased: '감소',
      weeklySales: '주간 매출',
      weeklyOrders: '주간 주문',
      visitorsOnline: '온라인 방문자',
      visitAndSalesStatistics: '방문 및 매출 통계',
      trafficSources: '트래픽 소스',
      searchEngines: '검색 엔진',
      directClick: '직접 클릭',
      bookmarksClick: '북마크 클릭',
      recentTickets: '최근 티켓',
      assignee: '담당자',
      subject: '제목',
      lastUpdate: '마지막 업데이트',
      trackingId: '추적 ID',
      done: '완료',
    },
    pages: {
      dashboard: {
        title: '대시보드',
        overview: '개요',
        weeklySales: '주간 매출',
        weeklyOrders: '주간 주문',
        visitorsOnline: '온라인 방문자',
        visitAndSalesStatistics: '방문 및 매출 통계',
        trafficSources: '트래픽 소스',
        searchEngines: '검색 엔진',
        directClick: '직접 클릭',
        bookmarksClick: '북마크 클릭',
        recentTickets: '최근 티켓',
        assignee: '담당자',
        subject: '제목',
        lastUpdate: '마지막 업데이트',
        trackingId: '추적 ID',
        done: '완료',
        increased: '증가',
        decreased: '감소',
      },
      operators: {
        title: '운영자 관리',
        addOperator: '운영자 추가',
        createOperator: '운영자 생성',
        deleteOperator: '운영자 삭제',
        operatorDetails: '운영자 세부 정보',
        searchPlaceholder: '이름, 이메일로 검색...',
        createSuccess: '운영자 생성 성공!',
        createFailed: '운영자 생성 실패. 다시 시도해주세요.',
        deleteSuccess: '운영자 삭제 성공!',
        deleteFailed: '운영자 삭제 실패. 다시 시도해주세요.',
        viewDetails: '세부 정보 보기',
        deleteOperatorTitle: '운영자 삭제',
        description: '시스템의 운영자 관리 및 추적',
        noOperatorsFound: '운영자를 찾을 수 없음',
        noOperatorsYet: '아직 운영자 없음',
        operatorCode: '운영자 코드',
        operatorName: '운영자 이름',
        enterOperatorCode: '운영자 코드 입력...',
        enterOperatorName: '운영자 이름 입력...',
        randomData: '랜덤 데이터',
        random: '랜덤',
        edit: '편집',
        userNotFound: '사용자 정보를 찾을 수 없음',
        operatorsLabel: '운영자',
      },
      games: {
        title: '게임 관리',
        addGame: '게임 추가',
        createGame: '게임 생성',
        searchPlaceholder: '게임 검색...',
        description: '시스템의 게임 관리 및 추적',
      },
      providerAccounts: {
        title: '제공자 계정 관리',
        addAccount: '제공자 계정 추가',
        createAccount: '제공자 계정 생성',
        deleteAccount: '제공자 계정 삭제',
        searchPlaceholder: '이름, 이메일, 코드로 검색...',
        createSuccess: '제공자 계정 생성 성공!',
        createFailed: '제공자 계정 생성 실패. 다시 시도해주세요.',
        deleteSuccess: '제공자 계정 삭제 성공!',
        deleteFailed: '제공자 계정 삭제 실패. 다시 시도해주세요.',
        deleteAccountTitle: '제공자 계정 삭제',
        description: '시스템의 제공자 계정 관리 및 추적',
        totalAccounts: '총 계정 수',
        activeAccounts: '활성',
        loadingAccounts: '제공자 계정 목록 로딩 중...',
        providerAccount: '제공자 계정',
        noAccountsFound: '제공자 계정을 찾을 수 없음',
        noAccountsYet: '아직 제공자 계정 없음',
        randomData: '랜덤 데이터',
        random: '랜덤',
      },
      roles: {
        title: '역할 관리',
        addRole: '역할 추가',
        createRole: '역할 생성',
        deleteRole: '역할 삭제',
        searchPlaceholder: '역할 검색...',
        createSuccess: '역할 생성 성공!',
        createFailed: '역할 생성 실패. 다시 시도해주세요.',
        deleteSuccess: '역할 삭제 성공!',
        deleteFailed: '역할 삭제 실패. 다시 시도해주세요.',
        role: '역할',
        permissions: '권한',
        noRolesFound: '역할을 찾을 수 없음',
        noRolesYet: '아직 역할 없음',
        loadingRoles: '역할 목록 로딩 중...',
        loadingPermissions: '권한 목록 로딩 중...',
        operatorAccounts: '운영자 계정',
        operatorAccount: '운영자 계정',
        selectPermissions: '권한 선택',
      },
      permissions: {
        title: '권한 관리',
        addPermission: '권한 추가',
        createPermission: '권한 생성',
        deletePermission: '권한 삭제',
        searchPlaceholder: '권한 검색...',
        createSuccess: '권한 생성 성공!',
        createFailed: '권한 생성 실패. 다시 시도해주세요.',
        deleteSuccess: '권한 삭제 성공!',
        deleteFailed: '권한 삭제 실패. 다시 시도해주세요.',
      },
      wallet: {
        title: '지갑 및 결제',
        addMethod: '결제 방법 추가',
        totalMethods: '총 결제 방법',
        activeMethods: '활성 방법',
        totalDailyLimit: '총 일일 한도',
        dailyLimit: '일일 한도',
        monthlyLimit: '월 한도',
        bank: '은행',
        ewallet: '전자 지갑',
        gateway: '결제 게이트웨이',
        description: '결제 방법 및 지갑 설정 관리',
      },
      promotions: {
        title: '프로모션 및 보너스',
        createPromotion: '프로모션 생성',
        totalPrograms: '총 프로그램',
        ongoing: '진행 중',
        totalParticipants: '총 참가자',
        totalBonusAwarded: '지급된 총 보너스',
        programName: '프로그램 이름',
        bonus: '보너스',
        maxBonus: '최대 보너스',
        participants: '참가자',
        startDate: '시작 날짜',
        endDate: '종료 날짜',
        firstDeposit: '첫 입금',
        deposit: '입금',
        cashback: '캐시백',
        tournament: '토너먼트',
        rebate: '리베이트',
        upcoming: '예정',
        expired: '만료됨',
        to: '까지',
        description: '프로모션 및 보너스 프로그램 관리',
      },
      transactions: {
        title: '거래',
        searchPlaceholder: '거래 검색 (ID, 플레이어)...',
        exportReport: '보고서 내보내기',
        totalTransactionsToday: '오늘 총 거래',
        totalDeposit: '총 입금',
        totalWithdraw: '총 출금',
        pendingProcessing: '처리 대기 중',
        transactionCode: '거래 코드',
        amount: '금액',
        paymentMethod: '결제 방법',
        time: '시간',
        deposit: '입금',
        withdraw: '출금',
        bet: '베팅',
        completed: '완료',
        rejected: '거부됨',
        description: '시스템의 모든 거래 보기 및 관리',
      },
      auditLogs: {
        title: '감사 로그',
        searchPlaceholder: '로그 검색 (사용자, 작업, 리소스)...',
        description: '시스템 활동 및 액세스 로그',
        exportLogs: '로그 내보내기',
        time: '시간',
        user: '사용자',
        action: '작업',
        resource: '리소스',
        ipAddress: 'IP 주소',
        login: '로그인',
        logout: '로그아웃',
        updatePlayer: '플레이어 업데이트',
        createPromotion: '프로모션 생성',
        deleteGame: '게임 삭제',
        changeSettings: '설정 변경',
        viewSensitiveData: '민감한 데이터 보기',
      },
      settings: {
        title: '시스템 설정',
        saveSettings: '설정 저장',
        generalSettings: '일반 설정',
        notificationSettings: '알림 설정',
        securitySettings: '보안',
        paymentSettings: '결제 설정',
        systemName: '시스템 이름',
        systemDescription: '설명',
        defaultLanguage: '기본 언어',
        emailNotification: '이메일 알림',
        emailNotificationDesc: '중요한 이벤트 시 이메일 전송',
        pushNotification: '푸시 알림',
        pushNotificationDesc: '관리자에게 푸시 알림 전송',
        smsAlert: 'SMS 알림',
        smsAlertDesc: '중요한 알림 시 SMS 전송',
        security: '보안',
        sessionTimeout: '세션 타임아웃 (분)',
        maxLoginAttempts: '최대 로그인 시도 횟수',
        require2FA: '2FA 요구',
        require2FADesc: '관리자에게 이중 인증 요구',
        minDepositLimit: '최소 입금 한도 (VND)',
        minWithdrawLimit: '최소 출금 한도 (VND)',
        withdrawProcessingTime: '출금 처리 시간 (시간)',
        description: '시스템 설정 및 기본 설정 구성',
      },
      alerts: {
        totalAlerts: '총 알림 수',
        unread: '읽지 않음',
        warning: '경고',
        totalAlertsLabel: '총 알림',
        description: '시스템 알림 및 알림 보기 및 관리',
      },
      reports: {
        exportPdf: 'PDF 내보내기',
        exportExcel: 'Excel 내보내기',
        monthlyRevenue: '이번 달 수익',
        profit: '이익',
        revenueByMonth: '월별 수익',
        revenue: '수익',
        winRate: '승률',
        comparedToLastMonth: '↑ % 전월 대비',
        description: '시스템 보고서 및 통계 보기 및 내보내기',
      },
      analytics: {
        registration: '등록',
        firstDeposit: '첫 입금',
        playGame: '게임',
        activeUsers: '활성 사용자',
        revenuePerDay: '일일 수익',
        sessions: '세션',
        conversionRate: '전환율',
        performanceLast5Days: '최근 5일 성과',
        conversionRateChart: '전환율',
        revenueTrend: '수익 추세',
        comparedToYesterday: '↑ % 전일 대비',
        description: '성능 분석 및 지표 보기',
      },
      monitoring: {
        online: '온라인',
        offline: '오프라인',
        warning: '경고',
        systemStatus: '시스템 상태',
        service: '서비스',
        uptime: '가동 시간',
        latency: '지연 시간',
        avgUptime: '평균 가동 시간',
        totalServices: '총 서비스',
        recentEvents: '최근 이벤트',
        description: '시스템 서비스 및 성능 모니터링',
      },
      risk: {
        totalAlerts: '총 위험 알림',
        fraud: '사기',
        unusualPattern: '비정상 패턴',
        accountCompromise: '계정 침해',
        pending: '대기 중',
        investigating: '조사 중',
        resolved: '해결됨',
        critical: '심각',
        high: '높음',
        medium: '보통',
        low: '낮음',
        lockedAccounts: '잠긴 계정',
        type: '유형',
        severity: '심각도',
        time: '시간',
        title: '위험 관리',
        description: '보안 위험 감지 및 처리',
      },
      api: {
        title: 'API 관리',
        createApiKey: '새 API 키 생성',
        description: 'API 키 및 엔드포인트 관리',
        totalApiKeys: '총 API 키',
        activeKeys: '활성 키',
        totalRequestsToday: '오늘 총 요청',
        avgResponseTime: '평균 응답 시간',
        apiKeys: 'API 키',
        apiKey: 'API 키',
        lastUsed: '마지막 사용',
        requests: '요청',
        rateLimit: '속도 제한',
        apiEndpoints: 'API 엔드포인트',
        method: '방법',
        path: '경로',
        callsToday: '오늘 호출',
        avgResponse: '평균 응답',
      },
      players: {
        totalPlayers: '총 플레이어 수',
        activePlayers: '활성 플레이어',
        inactivePlayers: '비활성 플레이어',
        totalBalance: '총 잔액',
        username: '사용자 이름',
        balance: '잔액',
        registrationDate: '등록 날짜',
        description: '시스템의 플레이어 관리 및 추적',
      },
      profile: {
        description: '개인 프로필 정보 보기 및 관리',
        personalInfo: '개인 정보',
        accountSecurity: '계정 보안',
        changePassword: '비밀번호 변경',
        changePasswordDesc: '보안을 강화하기 위해 계정 비밀번호 업데이트',
        twoFactorAuth: '이중 인증',
        twoFactorAuthDesc: '계정에 추가 보안 계층 추가',
        changePhoto: '사진 변경',
      },
      userSettings: {
        description: '개인 설정 및 기본 설정 관리',
        notifications: '알림',
        appearance: '모양',
        privacy: '개인정보 보호',
        emailNotifications: '이메일 알림',
        emailNotificationsDesc: '이메일로 알림 수신',
        pushNotifications: '푸시 알림',
        pushNotificationsDesc: '브라우저에서 푸시 알림 수신',
        smsNotifications: 'SMS 알림',
        smsNotificationsDesc: 'SMS로 알림 수신',
        language: '언어',
        theme: '테마',
        light: '밝은',
        dark: '어두운',
        auto: '자동',
        showEmail: '이메일 표시',
        showEmailDesc: '다른 사용자에게 이메일 주소 표시',
        showPhone: '전화번호 표시',
        showPhoneDesc: '다른 사용자에게 전화번호 표시',
      },
      tables: {
        id: 'ID',
        player: '플레이어',
        type: '유형',
        severity: '심각도',
        description: '설명',
        status: '상태',
        time: '시간',
        actions: '작업',
        service: '서비스',
        uptime: '가동 시간',
        latency: '지연 시간',
        players: '플레이어',
        gameName: '게임 이름',
        revenue: '수익',
        totalWagered: '총 베팅',
        game: '게임',
        wagered: '베팅',
      },
    },
    header: {
      providerPortal: '제공자 포털',
      operatorPortal: '운영자 포털',
      myProfile: '내 프로필',
      helpSupport: '도움말 및 지원',
    },
    menu: {
      dashboard: '대시보드',
      gamesManagement: '게임 관리',
      operatorsManagement: '운영자 관리',
      providerAccountsManagement: '제공자 계정 관리',
      rolesPermissionsManagement: '역할 및 권한 관리',
      playersManagement: '플레이어 관리',
      transactions: '거래',
      walletPayment: '지갑 및 결제',
      promotionsBonus: '프로모션 및 보너스',
      reports: '보고서 및 통계',
      analytics: '성능 분석',
      monitoring: '모니터링',
      riskManagement: '위험 관리',
      apiManagement: 'API 관리',
      alerts: '경고 및 알림',
      auditLogs: '감사 로그',
      systemSettings: '시스템 설정',
    },
    languages: {
      en: '영어',
      vi: '베트남어',
      zh: '중국어',
      th: '태국어',
      ja: '일본어',
      ko: '한국어',
    },
  },
};

// Export default để dễ import
export default translations;

// Helper function để lấy translation
export const getTranslation = (lang: SupportedLanguage, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

// Helper function để lấy danh sách ngôn ngữ được hỗ trợ
export const getSupportedLanguages = (): Array<{ code: SupportedLanguage; name: string }> => {
  return [
    { code: 'en', name: translations.en.languages.en },
    { code: 'vi', name: translations.en.languages.vi },
    { code: 'zh', name: translations.en.languages.zh },
    { code: 'th', name: translations.en.languages.th },
    { code: 'ja', name: translations.en.languages.ja },
    { code: 'ko', name: translations.en.languages.ko },
  ];
};

// Helper function để lấy tên ngôn ngữ theo ngôn ngữ hiện tại
export const getLanguageName = (langCode: SupportedLanguage, currentLang: SupportedLanguage = 'en'): string => {
  return translations[currentLang]?.languages[langCode] || langCode;
};
