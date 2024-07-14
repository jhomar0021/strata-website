$.getJSON("../../js/menuItems.json", function (menuItems) {
  var list = $("#ui-nav");
  var list2 = $("#ui-nav2");
  var currentPath = window.location.pathname;

  $.each(menuItems, function (i, item) {
    // Construct the correct path to compare
    var itemPath = new URL(item.href, window.location.origin).pathname;
    var isActive = currentPath.includes(itemPath) ? "active" : "";

    if (item.submenu) {
      var listItem = `<li class="sidebar-item">
                        <a class="sidebar-link ${isActive}" data-bs-toggle="collapse" href="#${item.href}" role="button" aria-expanded="false" aria-controls="submenu1">
                          Settings
                        </a>
                        <div class="collapse" id="${item.href}">
                          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" class="link-dark rounded">Profile</a></li>
                            <li><a href="#" class="link-dark rounded">Security</a></li>
                            <li><a href="#" class="link-dark rounded">Notifications</a></li>
                          </ul>
                        </div>
                      </li>`;
      var listItem2 = `<li class="offcanvas-item">
                        <a class="offcanvas-link ${isActive}" data-bs-toggle="collapse" href="#${item.href}" role="button" aria-expanded="false" aria-controls="submenu1">
                          Settings
                        </a>
                        <div class="collapse" id="${item.href}">
                          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" class="link-dark rounded">Profile</a></li>
                            <li><a href="#" class="link-dark rounded">Security</a></li>
                            <li><a href="#" class="link-dark rounded">Notifications</a></li>
                          </ul>
                        </div>
                      </li>`;
    } else {
      var listItem = `<li class="sidebar-item">
                        <a href="${item.href}" class="sidebar-link ${isActive}">
                          <i class="${item.icon} fw"></i>
                          <span>${item.name}</span>
                        </a>
                      </li>`;

      var listItem2 = `<li class="offcanvas-item w-100 pb-1 mb-2 text-start">
                        <a href="${item.href}" class="btn btn-primary text-start offcanvas-link w-100 py-2 px-3 fs-4 ${isActive}">
                          <i class="${item.icon} fw"></i>
                          <span>${item.name}</span>
                        </a>
                      </li>`;
    }

    list.append(listItem);
    list2.append(listItem2);
  });
}).fail(function () {
  console.error("Error loading the menu items");
});
