<template>
  <Window v-bind:title='title' width="640" height="320" margined v-on:show="show" menu="true" v-on:close="exit">
    <Box stretchy padded>
      <Box padded>
        <Group v-bind:title="stitle" margined>
          <Box padded>
              <Form label="SearchForm" padded>
                <Group>
                  <Box horizontal padded>
                    <RadioButtons horizontal v-bind:items="stypes" v-model="rtype"/>
                    <TextInput label="Search:" stretchy v-model="search"/>
                    <Button @click="searchit" v-bind:enabled="issearch">    Search   </Button>
                  </Box>
                </Group>
                <Button @click="newcontact" v-bind:enabled="!isnewcontact">New contact</Button>
              </Form>
          </Box>
      </Group>
      <Group v-bind:title="cmode" margined >
        <Box padded>
          <Form label="Form" padded>
            <TextInput label="Name:" v-model="name" v-bind:readonly="readonly"/>
            <Group title="Date of birth" margined >
              <Box horizontal padded>
                <DropdownList  stretchy v-bind:items="days" v-model="day" v-bind:enabled="!readonly"/>
                <DropdownList  stretchy v-bind:items="months" v-model="month" v-bind:enabled="!readonly"/>
                <DropdownList  stretchy v-bind:items="years" v-model="year" v-bind:enabled="!readonly"/>
              </Box>
          </Group>
            <TextInput label="Phone:" v-model="phone" v-bind:readonly="readonly"/>
            <TextInput label="Email:" v-model="email" v-bind:readonly="readonly"/>
            <DropdownList label="Location" stretchy v-bind:items="districts" v-model="district" v-bind:enabled="!readonly"/>
            <Box horizontal padded>
              <Button @click="init"     v-bind:enabled="!readonly || isedit"   v-bind:visible="issave || isedit"    >       Cancel       </Button>
              <Button @click="edit"     v-bind:enabled="isedit"      v-bind:visible="isedit"    >        Edit        </Button>
              <Button @click="remove"   v-bind:enabled="isedit"      v-bind:visible="isedit"    >       Remove       </Button>
              <Button @click="rollback" v-bind:enabled="isrollback"  v-bind:visible="isrollback">       Restore      </Button>
              <Button @click="save"     v-bind:enabled="isvalid"     v-bind:visible="issave"    >        Save        </Button>
            </Box>
          </Form>
        </Box>
      </Group>
    </Box>
      <Group stretchy margined >
        <TextInput v-model="message" readonly/>
      </Group>
    </Box>
  </Window>
</template>

<script src="../code/mainwindow.js"></script>
