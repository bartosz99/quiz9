<script lang="ts" setup>
import { ref } from 'vue';
import { Routes } from '@/enums/index';
import { NavRoutes } from '@/types';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ChevronsDown, Menu } from 'lucide-vue-next';
import GithubIcon from '@/icons/GithubIcon.vue';
import ToggleTheme from './ToggleTheme.vue';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode();
mode.value = 'dark';

const routeList: NavRoutes[] = [
  {
    href: Routes.QUIZ,
    label: 'Quiz'
  },
  {
    href: Routes.STATISTICS,
    label: 'Statistics'
  },
  {
    href: Routes.LEADERBOARD,
    label: 'Leaderboard'
  },
  {
    href: Routes.FAQ,
    label: 'FAQ'
  }
];

const isOpen = ref<boolean>(false);
</script>

<template>
  <header
    :class="{
      'shadow-light': mode === 'light',
      'shadow-dark': mode === 'dark',
      'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true
    }"
  >
    <a href="/" class="font-bold text-lg flex items-center">
      <ChevronsDown
        class="bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white"
      />
      Quiz9</a
    >
    <!-- Mobile -->
    <div class="flex items-center lg:hidden">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent
          side="left"
          class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card"
        >
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">
                <a href="/" class="flex items-center">
                  <ChevronsDown
                    class="bg-gradient-to-tr from-primary/70 via-primary to-primary/70 rounded-lg size-9 mr-2 border text-white"
                  />
                  Quiz9
                </a>
              </SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <RouterLink v-for="{ href, label } in routeList" :to="href">
                <Button :key="label" as-child variant="ghost" class="justify-start text-base">
                  <a @click="isOpen = false">
                    {{ label }}
                  </a>
                </Button>
              </RouterLink>
            </div>
          </div>

          <SheetFooter class="flex-col sm:flex-col justify-start items-start">
            <Separator class="mb-2" />
            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop -->
    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button
              v-for="{ href, label } in routeList"
              :key="label"
              as-child
              variant="ghost"
              class="justify-start text-base"
            >
              <a :href="href">
                {{ label }}
              </a>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="hidden lg:flex">
      <ToggleTheme />

      <Button as-child size="sm" variant="ghost" aria-label="View on GitHub">
        <a aria-label="View on GitHub" href="https://github.com/bartosz99/quiz9" target="_blank">
          <GithubIcon class="size-5" />
        </a>
      </Button>
    </div>
  </header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
