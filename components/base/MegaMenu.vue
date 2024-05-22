<template>
  <div
    class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
    id="navbarSupportedContentX"
    data-te-collapse-item
  >
    <ul class="mr-auto flex flex-row" data-te-navbar-nav-ref>
      <li class="static" data-te-nav-item-ref data-te-dropdown-ref>
        <NuxtLink
          class="flex items-center whitespace-nowrap pr-2 transition duration-150 ease-in-out lg:px-2 nav-link"
          href="#"
          data-te-ripple-init
          data-te-ripple-color="light"
          type="button"
          id="dropdownMenuButtonX"
          data-te-dropdown-toggle-ref
          aria-expanded="false"
          data-te-nav-link-ref
          >IMEI Checker
          <IconsCaretDown class="ml-2 text-black w-3" />
        </NuxtLink>
        <div
          class="absolute left-0 right-0 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding text-neutral-600 shadow-lg [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButtonX"
          data-te-dropdown-menu-ref
        >
          <div class="px-6 py-5 lg:px-8">
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <NuxtLink
                  href="#!"
                  aria-current="true"
                  class="block w-full border-b border-neutral-200 px-6 py-2 transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700"
                  >IPhone</NuxtLink
                >
                <NuxtLink
                  href="#!"
                  aria-current="true"
                  class="block w-full border-b border-neutral-200 px-6 py-2 transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700"
                  >Xiaomi</NuxtLink
                >
                <NuxtLink
                  href="#!"
                  aria-current="true"
                  class="block w-full border-b border-neutral-200 px-6 py-2 transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700"
                  >Samsung</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup></script>
