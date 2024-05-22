<script setup>
    const specialService = ref([
        {   id: 1,
            title: "Success Rate",
            details: "Not only classes, Fiverr Outsourcing Institute is always ready to support students in any need. So after online training you can directly come to our lab for offline practical, this facility is provided only to you."
        },
        {   
            id: 2,
            title: "Success Rate",
            details: "Not only classes, Fiverr Outsourcing Institute is always ready to support students in any need. So after online training you can directly come to our lab for offline practical, this facility is provided only to you."
        },
        {
            id: 3,
            title: "Success Rate",
            details: "Not only classes, Fiverr Outsourcing Institute is always ready to support students in any need. So after online training you can directly come to our lab for offline practical, this facility is provided only to you."
        },
        {   
            id: 4,
            title: "Success Rate",
            details: "Not only classes, Fiverr Outsourcing Institute is always ready to support students in any need. So after online training you can directly come to our lab for offline practical, this facility is provided only to you."
        }
    ]);
</script>

<template>
    <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0">Special service of SK Mobilole School</h3>
        <p class="text-small w-7/12 pt-4 pb-10">
            Not only classes, Fiverr Outsourcing Institute is always ready to support students in any need. So after online training you can directly come to our lab for offline practical, this facility is provided only to you.
        </p>
    </div>
    <div class="grid grid-cols-4 gap-5 h-[200px]">
        <div v-for="(service, id) in specialService" :key="id"> 
            <div class="text-center box-border p-6 bg-[#C4C4C4]">
                <h2 class="font-semibold text-2xl">
                    {{ service.title }}
                </h2>
                <p>
                    {{ service.details }}
                </p>
            </div>
        </div>
    </div>
</template>